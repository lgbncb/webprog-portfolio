import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function LetterGlitch({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    const cellSize = 20;
    let frame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      columns = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);

      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.imageSmoothingEnabled = smooth;
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);

      context.fillStyle = "rgba(0, 0, 0, 0.14)";
      context.fillRect(0, 0, width, height);

      context.font = "600 14px monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;
          const randomPick = Math.floor(Math.random() * GLYPHS.length);
          const glyph = GLYPHS[randomPick];

          const pulse = Math.sin((frame + row * 8 + column * 4) * 0.035);
          const alpha = 0.16 + (pulse + 1) * 0.12;
          context.fillStyle = `rgba(229, 9, 20, ${alpha})`;
          context.fillText(glyph, x, y);
        }
      }

      if (centerVignette) {
        const centerGradient = context.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.08,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.65
        );
        centerGradient.addColorStop(0, "rgba(0,0,0,0)");
        centerGradient.addColorStop(1, "rgba(0,0,0,0.65)");
        context.fillStyle = centerGradient;
        context.fillRect(0, 0, width, height);
      }

      if (outerVignette) {
        const outerGradient = context.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.15,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.85
        );
        outerGradient.addColorStop(0, "rgba(0,0,0,0)");
        outerGradient.addColorStop(1, "rgba(0,0,0,0.85)");
        context.fillStyle = outerGradient;
        context.fillRect(0, 0, width, height);
      }

      animationRef.current = window.setTimeout(() => {
        requestAnimationFrame(draw);
      }, Math.max(16, glitchSpeed));
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [centerVignette, glitchSpeed, outerVignette, smooth]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}
