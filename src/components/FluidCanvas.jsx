import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractional Brownian motion (fBM)
#define OCTAVES 5
float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < OCTAVES; ++i) {
        v += a * snoise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Scale space for more/less zoom on the marble texture
    st *= 3.0;

    // Mouse Interaction: Displace texture space away from cursor
    vec2 mouse = u_mouse / u_resolution;
    mouse.x *= u_resolution.x / u_resolution.y;
    mouse *= 3.0; // Match the scaling above

    float dist = distance(st, mouse);
    if (dist > 0.0 && u_mouse.x > 0.0) {
        // Smooth push outward from cursor (inverted direction for 'repel' effect)
        float force = smoothstep(1.2, 0.0, dist) * 0.4;
        st -= normalize(st - mouse) * force;
    }

    // Domain Warping (fBM inside fBM) to create fluid swirls
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.02 * u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 2.0 * q + vec2(1.7, 9.2) + 0.05 * u_time );
    r.y = fbm( st + 2.0 * q + vec2(8.3, 2.8) + 0.08 * u_time );

    float f = fbm(st + 2.5 * r);

    // Marble Bands (sine of the fBM creates ridges/lines)
    float bands = sin((f + r.x * 0.5) * 12.0) * 0.5 + 0.5;

    // Color Palette (Matched to reference image)
    vec3 darkNavy = vec3(0.03, 0.07, 0.15);
    vec3 deepBlue = vec3(0.12, 0.25, 0.40);
    vec3 lightBlue = vec3(0.49, 0.73, 0.90);
    vec3 silver = vec3(0.75, 0.80, 0.85);
    vec3 white = vec3(0.98, 0.98, 1.0);

    // Base color mix
    vec3 col = mix(darkNavy, deepBlue, clamp(f * 1.5, 0.0, 1.0));
    col = mix(col, lightBlue, smoothstep(0.2, 0.8, r.x));
    col = mix(col, silver, smoothstep(0.4, 0.9, r.y));
    
    // Apply bands
    col = mix(col, white, pow(bands, 4.0) * 0.7); // Add thin white/silver streaks
    col = mix(col, darkNavy, pow(1.0 - bands, 3.0) * 0.8); // Deepen the dark grooves

    gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function FluidCanvas({ heroRef }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const isVisible = useRef(true);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    // Cap dpr for performance (WebGL can be heavy on 4K screens)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Setup shaders
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Setup full-screen quad
    const positionLocation = gl.getAttribLocation(program, 'position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0
      ]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let startTime = Date.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      
      if (prefersReducedMotion) renderStatic();
    };

    const renderStatic = () => {
      gl.uniform1f(uTime, 0); // Fixed time
      gl.uniform2f(uMouse, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const render = () => {
      if (!isVisible.current) {
        requestRef.current = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      const time = (Date.now() - startTime) * 0.001;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouseRef.current.x * dpr, (canvas.clientHeight - mouseRef.current.y) * dpr); // WebGL Y is inverted

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();

    if (!prefersReducedMotion) {
      requestRef.current = requestAnimationFrame(render);
    } else {
      renderStatic();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [prefersReducedMotion]);

  // Handle intersection & mouse
  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const tx = e.clientX - rect.left;
      const ty = e.clientY - rect.top;
      
      // Initialize if first move
      if (mouseRef.current.x === -1000) {
        mouseRef.current.x = tx;
        mouseRef.current.y = ty;
      }
      mouseRef.current.targetX = tx;
      mouseRef.current.targetY = ty;
    };

    const onLeave = () => {
      // Move mouse far away so distortion stops smoothly
      mouseRef.current.targetX = -10000;
      mouseRef.current.targetY = -10000;
    };

    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(section);

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
    };
  }, [heroRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 transition-opacity duration-1000"
    />
  );
}
