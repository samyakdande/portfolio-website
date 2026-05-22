"use client";

import React, { useEffect, useRef } from 'react';

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vertex shader source code
  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // Fragment shader source code
  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float uVelocity;

    // Pseudo-random number generator
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    float noise(in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    // Fractal Brownian Motion
    #define NUM_OCTAVES 5
    float fbm(in vec2 st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(st);
            st = rot * st * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 st = gl_FragCoord.xy / iResolution.xy;
        // Fix aspect ratio
        st.x *= iResolution.x / iResolution.y;

        vec2 q = vec2(0.);
        q.x = fbm(st + 0.00 * iTime);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.);
        // Time controls the morphing speed, velocity boosts it slightly
        float timeEvo = iTime * 0.05 + uVelocity * 0.1;
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * timeEvo);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * timeEvo);

        float f = fbm(st + r);

        // Map the noise to shades of grey/black
        float fog = smoothstep(0.1, 0.9, f);
        
        // Deep cinematic background
        vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(0.1, 0.1, 0.1), fog);
        
        // Add subtle highlights based on noise density
        color += vec3(0.05, 0.05, 0.05) * smoothstep(0.4, 1.0, f);

        // Scroll velocity adds subtle brightness pulses
        color += vec3(0.02) * uVelocity * f;

        gl_FragColor = vec4(color, 1.0);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported.');
      return;
    }

    const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error: ', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Shader program link error: ', gl.getProgramInfoLog(shaderProgram));
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        time: gl.getUniformLocation(shaderProgram, 'iTime'),
        velocity: gl.getUniformLocation(shaderProgram, 'uVelocity'),
      },
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationFrameId: number;
    let baseTime = 0;
    let lastFrameTime = Date.now();
    let lastScrollY = window.scrollY;
    let smoothVelocity = 0;

    const render = () => {
      const now = Date.now();
      const dt = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      const currentScrollY = window.scrollY;
      const velocity = (currentScrollY - lastScrollY) / (dt || 0.016);
      lastScrollY = currentScrollY;
      smoothVelocity += (Math.abs(velocity) - smoothVelocity) * 0.1;

      // Accelerate time based on scroll velocity
      const rawVelocity = Math.abs(smoothVelocity);
      const normalizedVelocity = Math.min(rawVelocity / 1000, 1.0); // 0 to 1
      
      // Time moves faster when scrolling
      baseTime += dt * (1.0 + normalizedVelocity * 3.0);

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      gl.uniform1f(programInfo.uniformLocations.time, baseTime);
      gl.uniform1f(programInfo.uniformLocations.velocity, normalizedVelocity);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [fsSource, vsSource]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-[#050505] pointer-events-none" 
    />
  );
};

export default ShaderBackground;
