"use client";

import { useState } from "react";

interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  thickness?: number;
  className?: string;
  innerText?: string;
}

export default function DonutChart({
  data,
  size = 200,
  thickness = 40,
  className = "",
  innerText = "",
}: DonutChartProps) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate the circumference of the circle
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const circumference = 2 * Math.PI * (radius - thickness / 2);

  // Starting angle is -90 degrees (top of the circle) in radians
  let startAngle = -Math.PI / 2;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          // Calculate the angle for this segment
          const angle = (item.value / total) * 2 * Math.PI;

          // Calculate the end angle
          const endAngle = startAngle + angle;

          // Calculate the SVG arc path
          const largeArcFlag = angle > Math.PI ? 1 : 0;

          // Calculate start and end points
          const startX =
            radius + (radius - thickness / 2) * Math.cos(startAngle);
          const startY =
            radius + (radius - thickness / 2) * Math.sin(startAngle);
          const endX = radius + (radius - thickness / 2) * Math.cos(endAngle);
          const endY = radius + (radius - thickness / 2) * Math.sin(endAngle);

          // Create the path
          const path = [
            `M ${startX} ${startY}`,
            `A ${radius - thickness / 2} ${
              radius - thickness / 2
            } 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          ].join(" ");

          // Store the current start angle to use as the next segment's start
          const currentStartAngle = startAngle;
          startAngle = endAngle;

          return (
            <g key={index} className="transition-all duration-200">
              <path
                d={path}
                fill="none"
                stroke={item.color}
                strokeWidth={thickness}
                strokeLinecap="butt"
                className={`transition-all duration-200 ${
                  activeSegment === index
                    ? "opacity-100 stroke-[45px]"
                    : "opacity-80"
                }`}
                onMouseEnter={() => setActiveSegment(index)}
                onMouseLeave={() => setActiveSegment(null)}
              />
            </g>
          );
        })}

        {/* Inner circle for the donut hole */}
        <circle cx={radius} cy={radius} r={innerRadius} fill="none" />
      </svg>

      {/* Center text showing the active segment or total */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {!innerText ? (
          <></>
        ) : (
          <span className="text-xs  text-gray-700">{innerText}</span>
        )}
      </div>
    </div>
  );
}
