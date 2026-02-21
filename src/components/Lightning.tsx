import React, { useEffect, useRef } from "react";
import "./Lightning.css";

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  saturation?: number;
  brightness?: number;
  grayscale?: number; // 0 to 1
}

const Lightning: React.FC<LightningProps> = ({
  hue = 187,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  saturation = 0.7,
  brightness = 0.8,
  grayscale = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    let rafId = 0;
    let isDisposed = false;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      uniform float uSaturation;
      uniform float uBrightness;
      uniform float uGrayscale;

      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
        p = fract(p * 0.1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
      }

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 fp = fract(p);
        float a = hash12(ip);
        float b = hash12(ip + vec2(1.0, 0.0));
        float c = hash12(ip + vec2(0.0, 1.0));
        float d = hash12(ip + vec2(1.0, 1.0));
        vec2 t = smoothstep(0.0, 1.0, fp);
        return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < OCTAVE_COUNT; ++i) {
          value += amplitude * noise(p);
          p *= rotate2d(0.45);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        uv = 2.0 * uv - 1.0;
        uv.x *= iResolution.x / iResolution.y;
        uv.x += uXOffset;

        uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;

        float dist = max(abs(uv.x), 0.001);
        vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, uSaturation, uBrightness));
        vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;

        float luma = dot(col, vec3(0.299, 0.587, 0.114));
        col = mix(col, vec3(luma), uGrayscale);

        fragColor = vec4(col, 1.0);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    if (aPosition < 0) {
      console.error("aPosition attribute not found");
      return;
    }

    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");
    const uSaturationLocation = gl.getUniformLocation(program, "uSaturation");
    const uBrightnessLocation = gl.getUniformLocation(program, "uBrightness");
    const uGrayscaleLocation = gl.getUniformLocation(program, "uGrayscale");

    const startTime = performance.now();

    const render = () => {
      if (isDisposed) return;

      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      if (iResolutionLocation) gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      if (iTimeLocation) gl.uniform1f(iTimeLocation, (performance.now() - startTime) / 1000);
      if (uHueLocation) gl.uniform1f(uHueLocation, hue);
      if (uXOffsetLocation) gl.uniform1f(uXOffsetLocation, xOffset);
      if (uSpeedLocation) gl.uniform1f(uSpeedLocation, speed);
      if (uIntensityLocation) gl.uniform1f(uIntensityLocation, intensity);
      if (uSizeLocation) gl.uniform1f(uSizeLocation, size);
      if (uSaturationLocation) gl.uniform1f(uSaturationLocation, saturation);
      if (uBrightnessLocation) gl.uniform1f(uBrightnessLocation, brightness);
      if (uGrayscaleLocation) gl.uniform1f(uGrayscaleLocation, grayscale);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = window.requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    render();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [hue, xOffset, speed, intensity, size, saturation, brightness, grayscale]);

  return <canvas ref={canvasRef} className="lightning-container" />;
};

export default Lightning;





// import React, { useEffect, useRef } from "react";
// import "./Lightning.css";

// interface LightningProps {
//   hue?: number;
//   xOffset?: number;
//   speed?: number;
//   intensity?: number;
//   size?: number;
//   saturation?:0;
  
// }

// const Lightning: React.FC<LightningProps> = ({
//   hue = 230,
//   xOffset = 0,
//   speed = 1,
//   intensity = 1,
//   size = 1,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const gl = canvas.getContext("webgl");
//     if (!gl) {
//       console.error("WebGL not supported");
//       return;
//     }

//     let rafId = 0;
//     let isDisposed = false;

//     const resizeCanvas = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
//       const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
//       if (canvas.width !== width || canvas.height !== height) {
//         canvas.width = width;
//         canvas.height = height;
//       }
//     };

//     const vertexShaderSource = `
//       attribute vec2 aPosition;
//       void main() {
//         gl_Position = vec4(aPosition, 0.0, 1.0);
//       }
//     `;

//     const fragmentShaderSource = `
//       precision mediump float;

//       uniform vec2 iResolution;
//       uniform float iTime;
//       uniform float uHue;
//       uniform float uXOffset;
//       uniform float uSpeed;
//       uniform float uIntensity;
//       uniform float uSize;

//       #define OCTAVE_COUNT 10

//       vec3 hsv2rgb(vec3 c) {
//         vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
//         return c.z * mix(vec3(1.0), rgb, c.y);
//       }

//       float hash11(float p) {
//         p = fract(p * 0.1031);
//         p *= p + 33.33;
//         p *= p + p;
//         return fract(p);
//       }

//       float hash12(vec2 p) {
//         vec3 p3 = fract(vec3(p.xyx) * 0.1031);
//         p3 += dot(p3, p3.yzx + 33.33);
//         return fract((p3.x + p3.y) * p3.z);
//       }

//       mat2 rotate2d(float theta) {
//         float c = cos(theta);
//         float s = sin(theta);
//         return mat2(c, -s, s, c);
//       }

//       float noise(vec2 p) {
//         vec2 ip = floor(p);
//         vec2 fp = fract(p);
//         float a = hash12(ip);
//         float b = hash12(ip + vec2(1.0, 0.0));
//         float c = hash12(ip + vec2(0.0, 1.0));
//         float d = hash12(ip + vec2(1.0, 1.0));
//         vec2 t = smoothstep(0.0, 1.0, fp);
//         return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
//       }

//       float fbm(vec2 p) {
//         float value = 0.0;
//         float amplitude = 0.5;
//         for (int i = 0; i < OCTAVE_COUNT; ++i) {
//           value += amplitude * noise(p);
//           p *= rotate2d(0.45);
//           p *= 2.0;
//           amplitude *= 0.5;
//         }
//         return value;
//       }

//       void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//         vec2 uv = fragCoord / iResolution.xy;
//         uv = 2.0 * uv - 1.0;
//         uv.x *= iResolution.x / iResolution.y;
//         uv.x += uXOffset;

//         uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;

//         float dist = max(abs(uv.x), 0.001);
//         vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
//         vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
//         fragColor = vec4(col, 1.0);
//       }

//       void main() {
//         mainImage(gl_FragColor, gl_FragCoord.xy);
//       }
//     `;

//     const compileShader = (source: string, type: number): WebGLShader | null => {
//       const shader = gl.createShader(type);
//       if (!shader) return null;
//       gl.shaderSource(shader, source);
//       gl.compileShader(shader);
//       if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//         gl.deleteShader(shader);
//         return null;
//       }
//       return shader;
//     };

//     const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
//     const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
//     if (!vertexShader || !fragmentShader) return;

//     const program = gl.createProgram();
//     if (!program) return;

//     gl.attachShader(program, vertexShader);
//     gl.attachShader(program, fragmentShader);
//     gl.linkProgram(program);

//     if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//       console.error("Program linking error:", gl.getProgramInfoLog(program));
//       gl.deleteProgram(program);
//       gl.deleteShader(vertexShader);
//       gl.deleteShader(fragmentShader);
//       return;
//     }

//     const vertices = new Float32Array([
//       -1, -1, 1, -1, -1, 1,
//       -1,  1, 1, -1,  1, 1,
//     ]);

//     const vertexBuffer = gl.createBuffer();
//     if (!vertexBuffer) return;

//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const aPosition = gl.getAttribLocation(program, "aPosition");
//     if (aPosition < 0) {
//       console.error("aPosition attribute not found");
//       return;
//     }

//     gl.enableVertexAttribArray(aPosition);
//     gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

//     const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
//     const iTimeLocation = gl.getUniformLocation(program, "iTime");
//     const uHueLocation = gl.getUniformLocation(program, "uHue");
//     const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
//     const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
//     const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
//     const uSizeLocation = gl.getUniformLocation(program, "uSize");

//     const startTime = performance.now();

//     const render = () => {
//       if (isDisposed) return;

//       resizeCanvas();
//       gl.viewport(0, 0, canvas.width, canvas.height);
//       gl.useProgram(program);

//       if (iResolutionLocation) gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
//       if (iTimeLocation) gl.uniform1f(iTimeLocation, (performance.now() - startTime) / 1000);
//       if (uHueLocation) gl.uniform1f(uHueLocation, hue);
//       if (uXOffsetLocation) gl.uniform1f(uXOffsetLocation, xOffset);
//       if (uSpeedLocation) gl.uniform1f(uSpeedLocation, speed);
//       if (uIntensityLocation) gl.uniform1f(uIntensityLocation, intensity);
//       if (uSizeLocation) gl.uniform1f(uSizeLocation, size);

//       gl.drawArrays(gl.TRIANGLES, 0, 6);
//       rafId = window.requestAnimationFrame(render);
//     };

//     window.addEventListener("resize", resizeCanvas);
//     render();

//     return () => {
//       isDisposed = true;
//       window.cancelAnimationFrame(rafId);
//       window.removeEventListener("resize", resizeCanvas);

//       gl.bindBuffer(gl.ARRAY_BUFFER, null);
//       gl.deleteBuffer(vertexBuffer);
//       gl.deleteProgram(program);
//       gl.deleteShader(vertexShader);
//       gl.deleteShader(fragmentShader);
//     };
//   }, [hue, xOffset, speed, intensity, size]);

//   return <canvas ref={canvasRef} className="lightning-container" />;
// };

// export default Lightning;

