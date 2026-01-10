// components/StarRating.tsx
import { useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
};

export default function StarRating({ value, onChange, max = 10 }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((num) => {
        const filled = hovered ? num <= hovered : num <= value;

        return (
          <span
            key={num}
            onClick={() => onChange(num)}
            onMouseEnter={() => setHovered(num)}
            onMouseLeave={() => setHovered(null)}
            className={`cursor-pointer text-2xl transition 
              ${filled ? "text-yellow-400 scale-110" : "text-gray-300"}
            `}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
