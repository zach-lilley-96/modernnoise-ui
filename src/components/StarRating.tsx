// components/StarRating.tsx
import { useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  orientation?: "horizontal" | "vertical";
};

export default function StarRating({ value, onChange, max = 10, orientation = "horizontal" }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const getDisplayValue = () => (hovered !== null ? hovered : value);

  const isVertical = orientation === "vertical";

  return (
    <div className={`flex ${isVertical ? "flex-col-reverse space-y-reverse" : "flex-row space-x-0.5"}`}>
      {Array.from({ length: max }, (_, i) => i + 1).map((num) => {
        const displayValue = getDisplayValue();
        const isFull = displayValue >= num;
        const isHalf = displayValue === num - 0.5;

        return (
          <div
            key={num}
            className="relative cursor-pointer transition hover:scale-110 flex text-xl"
            onMouseLeave={() => setHovered(null)}
          >
            {/* Hitboxes */}
            {isVertical ? (
              <>
                {/* Bottom Half Hitbox (Lower value) */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 z-10"
                  onMouseEnter={() => setHovered(num - 0.5)}
                  onClick={() => onChange(num - 0.5)}
                />
                {/* Top Half Hitbox (Higher value) */}
                <div
                  className="absolute inset-x-0 top-0 h-1/2 z-10"
                  onMouseEnter={() => setHovered(num)}
                  onClick={() => onChange(num)}
                />
              </>
            ) : (
              <>
                {/* Left Half Hitbox */}
                <div
                  className="absolute inset-y-0 left-0 w-1/2 z-10"
                  onMouseEnter={() => setHovered(num - 0.5)}
                  onClick={() => onChange(num - 0.5)}
                />
                {/* Right Half Hitbox */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2 z-10"
                  onMouseEnter={() => setHovered(num)}
                  onClick={() => onChange(num)}
                />
              </>
            )}

            {/* Background / Filled Star */}
            <span
              className={`select-none ${
                isFull
                  ? "text-yellow-400"
                  : isHalf
                  ? "text-yellow-400 [clip-path:inset(0_50%_0_0)]"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
            {/* Gray background for the empty half of a half-star */}
            {isHalf && (
              <span className="absolute inset-0 text-gray-300 select-none [clip-path:inset(0_0_0_50%)]">
                ★
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
