import React from "react";
import { ResponsiveLine } from "@nivo/line";

/**
 * Science stuff:
 * "Half-life" by Deranged Physiology
 * https://shorturl.at/LQRU8
 */

const plasma = (hours = 24, constant = 2.5, halfLife = 2.5, delay = 0) => {
  hours = [...Array(hours + 1).keys()];

  const data = [];

  const effect = (t) => {
    // t: hours after intake
    const k = 0.693 / halfLife;

    const timeToTop = 1;

    if (t < delay) {
      return 0;
    }

    if (t < timeToTop + delay) {
      return (t * constant / (timeToTop + delay));
    }

    return (constant * Math.exp(-k * (t - (timeToTop + delay)))).toFixed(2);
  };

  hours.forEach((hour) => {
    data.push(effect(hour));
  });

  return data;
};

const arrayToNivo = (array) => {
  const nivo = [];

  array.forEach((element, hour) => {
    nivo.push({ x: hour, y: element });
  });

  return nivo;
};

const drugs = {
  methylfenidate: { constant: 0.2, halfLife: 2.5 },
};

const pills = [{
  name: "Ritalin MR",
  doses: [
    {
      drug: drugs.methylfenidate,
      releases: [0, 4],
    },
  ],
}];

const prescription = [
  { name: "Ritalin MR", volume: 30, time: 6 },
  { name: "Ritalin MR", volume: 30, time: 13 },
];

const layers = [];

prescription.forEach((pill) => {
  pills[pills.findIndex((p) => p.name === pill.name)].doses.forEach(
    (dose, hour) => {
      dose.releases.forEach((release, index) => {
        layers.push(plasma(
          24,
          dose.drug.constant * pill.volume,
          dose.drug.halfLife,
          release + pill.time + 1,
        ));
      });
    },
  );
});

console.log(layers);

const sum = layers.reduce((a, b) => {
  return a.map((element, index) => {
    const elementWiseSum = parseFloat(element) + parseFloat(b[index]);
    return elementWiseSum;
  });
});

const data = arrayToNivo(sum);

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
            data,
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
