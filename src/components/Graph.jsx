import React from "react";
import { ResponsiveLine } from "@nivo/line";
import getData from "functions/prescription.js";

/**
 * Science stuff:
 * "Half-life" by Deranged Physiology
 * https://shorturl.at/LQRU8
 */

export default ({ prescription }) => {
  const commonProperties = {
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
    enableSlices: "x",
  };

  // const curveOptions = [
  //   "linear",
  //   "monotoneX",
  //   "step",
  //   "stepBefore",
  //   "stepAfter",
  // ];

  // const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  //   <g>
  //     <circle
  //       fill="#fff"
  //       r={size / 2}
  //       strokeWidth={borderWidth}
  //       stroke={borderColor}
  //     />
  //     <circle
  //       r={size / 5}
  //       strokeWidth={borderWidth}
  //       stroke={borderColor}
  //       fill={color}
  //       fillOpacity={0.35}
  //     />
  //   </g>
  // );

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
        {...commonProperties}
        margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
        data={[
          {
            id: "methylfenidate",
            data: prescription ? getData(prescription) : [],
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
