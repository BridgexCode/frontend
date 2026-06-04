"use client";

import React, { useEffect, useRef } from "react";

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL compilation and render loop
    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (LogisticsPro flowing ambient green/white theme)
    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = v_texCoord;
          
          // Flowing ambient gradient using Whatsapp green and soft neutral slate tints
          vec3 color1 = vec3(0.145, 0.827, 0.4); // Brand green (#25D366)
          vec3 color2 = vec3(1.0, 1.0, 1.0);     // Pure White
          vec3 color3 = vec3(0.973, 0.98, 0.988); // Off-White Slate (#F8FAFC)
          
          // Wave motion calculations
          float speed = u_time * 0.2;
          float wave1 = sin(uv.x * 3.0 + speed) * cos(uv.y * 2.0 - speed * 0.5);
          float wave2 = sin(uv.y * 4.0 - speed * 0.8) * cos(uv.x * 2.5 + speed);
          
          float mask = smoothstep(-1.0, 1.0, wave1 + wave2);
          
          vec3 finalColor = mix(color2, color3, uv.y);
          // Keep green influence extremely subtle (0.04 weight) for premium light theme feel
          finalColor = mix(finalColor, color1, mask * 0.04); 
          
          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Helper to compile shader
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compiler error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Buffer setup
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLocation = gl.getUniformLocation(program, "u_time");
    const uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const uMouseLocation = gl.getUniformLocation(program, "u_mouse");

    // Mouse telemetry setup
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resizing
    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => syncSize());
      resizeObserver.observe(canvas);
    }
    syncSize();

    // Render loop
    const render = (time: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      if (uTimeLocation) {
        gl.uniform1f(uTimeLocation, time * 0.001);
      }
      if (uResolutionLocation) {
        gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      }
      if (uMouseLocation) {
        gl.uniform2f(uMouseLocation, mouse.x, mouse.y);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-background pointer-events-none" style={{ display: "block" }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
export default ShaderBackground;
