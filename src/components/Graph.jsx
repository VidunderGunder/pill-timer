import React from "react";
import { ResponsiveLine } from "@nivo/line";
import getData from "functions/prescription.js";

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

  return (
    <div style={{ height: 300 }}>
      <ResponsiveLine
        data={[
          {
            id: "methylfenidate",
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
      />
    </div>
  );
};
