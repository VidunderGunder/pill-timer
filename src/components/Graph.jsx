import React from "react";
import { ResponsiveLine } from "@nivo/line";
import getData from "functions/prescription.js";
// import { linearGradientDef } from "@nivo/core";
import { currentHours } from "functions/time.js";

/**
 * Science stuff:
 * "Half-life" by Deranged Physiology
 * https://shorturl.at/LQRU8
 */

export default ({ prescription }) => {
  if (!prescription || (prescription && prescription.length === 0)) {
    return null;
  }

  prescription.forEach((pill) => {
    if (!pill.name) {
      return null;
    }
  });

  const data = prescription ? getData(prescription) : [];

  return (
    <div style={{ height: 300 }}>
      <ResponsiveLine
        data={[
          {
            id: "prescription",
            data: prescription ? getData(prescription) : [],
          },
        ]}
        margin={{ top: 20, right: 5, bottom: 60, left: 35 }}
        animate={true}
        motionDamping={50}
        motionStiffness={200}
        enableSlices="x"
        enablePoints={false}
        axisBottom={{
          format: (y) =>
            `${String(y).length === 1 ? "0" : ""}${y % 1 > 0 ? `` : `${y}:00`}`,
          orient: "bottom",
          tickSize: 5,
          tickPadding: 7.5,
          tickRotation: -60,
        }}
        axisLeft={{
          tickSize: 5,
        }}
        curve="monotoneX"
        markers={[
          {
            axis: "x",
            value: currentHours,
            lineStyle: { stroke: "black", opacity: 0.25, strokeWidth: 2 },
            legend: "Now",
          },
        ]}
      />
    </div>
  );
};
