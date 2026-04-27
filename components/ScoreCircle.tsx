"use client";

import React, { useEffect, useState } from "react";

interface ScoreCircleProps {
  score: number;
  label: string;
  size?: number;
}

export default function ScoreCircle({ score, label, size = 120 }: ScoreCircleProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    // Animate the score when it appears
    const timer = setTimeout(() => {
      setCurrentScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s <= 40) return "#ef4444"; // red
    if (s <= 70) return "#f59e0b"; // yellow
    return "#22c55e"; // green
  };

  const offset = circumference - (currentScore / 100) * circumference;
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9" // slate-100
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 1s ease-out, stroke 0.3s ease",
            }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold tracking-tight" style={{ color }}>
            {Math.round(currentScore)}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
