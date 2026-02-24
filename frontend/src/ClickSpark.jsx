import { useCallback, useMemo, useRef, useState } from "react";

export default function ClickSpark({
  children,
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}) {
  const [sparks, setSparks] = useState([]);
  const idRef = useRef(0);

  const sparkVectors = useMemo(() => {
    const vectors = [];
    for (let index = 0; index < sparkCount; index += 1) {
      const angle = (Math.PI * 2 * index) / sparkCount;
      vectors.push({
        x: Math.cos(angle),
        y: Math.sin(angle),
      });
    }
    return vectors;
  }, [sparkCount]);

  const handleClick = useCallback(
    (event) => {
      const id = idRef.current;
      idRef.current += 1;

      const nextSpark = {
        id,
        x: event.clientX,
        y: event.clientY,
      };

      setSparks((current) => [...current, nextSpark]);

      window.setTimeout(() => {
        setSparks((current) => current.filter((spark) => spark.id !== id));
      }, duration);
    },
    [duration]
  );

  return (
    <div className="relative" onClick={handleClick}>
      {children}

      <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
        {sparks.map((spark) => (
          <div key={spark.id} className="absolute" style={{ left: spark.x, top: spark.y }}>
            {sparkVectors.map((vector, index) => (
              <span
                key={`${spark.id}-${index}`}
                className="absolute rounded-full"
                style={{
                  width: sparkSize,
                  height: sparkSize,
                  backgroundColor: sparkColor,
                  marginLeft: -sparkSize / 2,
                  marginTop: -sparkSize / 2,
                  animation: `click-spark ${duration}ms ease-out forwards`,
                  "--spark-x": `${vector.x * sparkRadius}px`,
                  "--spark-y": `${vector.y * sparkRadius}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes click-spark {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--spark-x), var(--spark-y)) scale(0.4);
          }
        }
      `}</style>
    </div>
  );
}
