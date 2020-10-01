const plasma = (
  y = () => 0,
  hours = 24,
  constant = 2.5,
  halfLife = 2.5,
  delay = 0
) => {
  hours = [...Array(hours * 2 + 1).keys()];

  hours = hours.map((hour) => hour / 2);

  const data = [];

  hours.forEach((hour) => {
    data.push(y(hour, delay, halfLife, constant));
  });

  return data;
};

const arrayToData = (array) => {
  const data = [];

  array.forEach((element, hour) => {
    data.push({ x: Number(hour / 2), y: Number(element.toFixed(1)) });
  });

  return data;
};

const drugs = {
  methylphenidate: { constant: 0.725, halfLife: 2.5, name: "Methylphenidate" },
};

const functions = {
  generic: (t, delay, halfLife, constant) => {
    // t: hours after intake
    const k = 0.693 / halfLife;

    const timeToTop = 2;

    if (t < delay) {
      return 0;
    }

    if (t < timeToTop + delay) {
      return ((t - delay) * constant) / timeToTop;
    }

    return constant * Math.exp(-k * (t - (timeToTop + delay)));
  },
  concerta: (t, delay, halfLife, constant) => {
    // Needs work
    constant = constant / 3.35;
    const k = (0.3 / halfLife) * 2;

    const first = 1;
    const second = 4;
    const third = 6;
    const fourth = 8;
    const fifth = 10;

    if (t < delay) {
      return 0;
    }

    if (t < first + delay) {
      return ((t - delay) * constant) / 2.5 / first;
    }
    if (t < second + delay) {
      return constant / 2 + ((t - delay) * constant) / 7.5 / second;
    }
    if (t < third + delay) {
      return ((t - delay) * constant) / third;
    }
    if (t < fourth + delay) {
      return constant / 2 + ((t - delay) * constant) / fourth;
    }
    if (t < fifth + delay) {
      return constant * 1.75 - ((t - delay) * constant) / 2.5 / fifth;
    }

    return (constant / 1.25) * Math.exp(-k * (t - (fifth + delay + 2)));
  },
};

const pills = [
  {
    name: "Ritalin MR",
    doses: [
      {
        drug: drugs.methylphenidate,
        releases: [0, 4],
        y: functions.generic,
      },
    ],
  },
  {
    name: "Ritalin IR",
    doses: [
      {
        drug: drugs.methylphenidate,
        releases: [0],
        y: functions.generic,
      },
    ],
  },
  {
    name: "Concerta",
    doses: [
      {
        drug: drugs.methylphenidate,
        releases: [0],
        y: functions.concerta,
      },
    ],
  },
];

export default (prescription) => {
  const layers = [];

  prescription.forEach((pill) => {
    console.log(pill.y);
    pills[pills.findIndex((p) => p.name === pill.name)].doses.forEach(
      (dose) => {
        dose.releases.forEach((release) => {
          layers.push(
            plasma(
              dose.y,
              24,
              (dose.drug.constant * Number(pill.volume)) / dose.releases.length,
              dose.drug.halfLife,
              release + Number(pill.time)
            )
          );
        });
      }
    );
  });

  const sum = layers.reduce((a, b) => {
    return a.map((element, index) => {
      const elementWiseSum = parseFloat(element) + parseFloat(b[index]);
      return elementWiseSum;
    });
  });

  return arrayToData(sum);
};
