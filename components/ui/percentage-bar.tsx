"use client";

import { useState, useEffect, useRef } from "react";

export const PercentageBar = ({
  onChange,
}: {
  onChange?: (percentage: number) => void;
}) => {
  const [percentage, setPercentage] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const handleMouseMove = (e: MouseEvent) => {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const newPercentage = Math.round((x / rect.width) * 100);
        setPercentage(newPercentage);
        onChange?.(newPercentage);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    onChange?.(percentage);
  }, [percentage, onChange]);

  return (
    <div className="w-full">
      <div className="mb-2 text-center text-primary font-semibold">
        {percentage}%
      </div>
      <div
        ref={barRef}
        className="relative h-3 bg-primary rounded-full cursor-pointer mb-4"
        onMouseDown={handleMouseDown}
      >
        <div
          className="absolute top-0 left-0 h-full  rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-0 right-0 w-6 h-6  border-2 border-primary bg-accent rounded-full -translate-y-1/4 translate-x-1/2"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center px-2">
        {[0, 25, 50, 75, 100].map((mark) => (
          <span key={mark} className="text-xs text-primary font-semibold">
            {mark}%
          </span>
        ))}
      </div>
    </div>
  );
};
