import { useRef, useState } from "react";

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent,
  onClick,
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [showHint, setShowHint] = useState(false);

  const handleMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = (x / rect.width) * 2 - 1;
    const yPercent = (y / rect.height) * 2 - 1;

    const rotateY = xPercent * rotateAmplitude;
    const rotateX = -yPercent * rotateAmplitude;

    setTransform(
      `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scaleOnHover})`
    );
  };

  const handleLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
    setShowHint(false);
  };

  return (
    <button
      type="button"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className="relative rounded-md overflow-hidden shadow-xl bg-black border border-gray-800 text-left"
      style={{
        height: containerHeight,
        width: containerWidth,
        transform,
        transition: "transform 120ms ease-out",
      }}
      aria-label={captionText}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="object-cover w-full h-full opacity-85"
        style={{ height: imageHeight, width: imageWidth }}
      />

      {displayOverlayContent && (
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent text-sm font-semibold text-white">
          {overlayContent}
        </div>
      )}

      {showTooltip && showHint && (
        <div className="absolute top-2 left-2 px-2 py-1 text-[10px] bg-black/80 border border-gray-700 rounded text-gray-200">
          Click to open project
        </div>
      )}

      {showMobileWarning && (
        <div className="absolute top-2 right-2 px-2 py-1 text-[10px] bg-[#e50914] rounded text-white md:hidden">
          Best on desktop
        </div>
      )}
    </button>
  );
}
