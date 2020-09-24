import React from "react";
import { ResponsiveLine } from "@nivo/line";

const y = (hours = 48) => {
  hours = [...Array(hours + 1).keys()];

  const data = [];
  const effect = (t) => {
    const constant = 5;
    const halfLife = 2;
    const k = 0.693 / halfLife;

    return (constant * Math.exp(-k * t)).toFixed(2);
  };

  hours.forEach((hour) => {
    data.push({ x: hour, y: effect(hour) });
  });

  return data;
};

console.log(y());

y();

export default () => {
  const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    // data,
    animate: true,
    enableSlices: "x",
  };

  const curveOptions = [
    "linear",
    "monotoneX",
    "step",
    "stepBefore",
    "stepAfter",
  ];

  const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
      <circle
        fill="#fff"
        r={size / 2}
        strokeWidth={borderWidth}
        stroke={borderColor}
      />
      <circle
        r={size / 5}
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );

  return (
    <div style={{ height: 300 }}>
      <ResponsiveLine
        {...commonProperties}
        margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
        data={[
          {
            id: "test",
            data: y(),
          },
        ]}
        enablePoints={false}
        enableGridX={true}
        curve="monotoneX"
        motionStiffness={200}
        motionDamping={50}
      />
    </div>
  );
};
