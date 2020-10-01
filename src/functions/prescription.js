const plasma = (hours = 24, constant = 2.5, halfLife = 2.5, delay = 0) => {
  hours = [...Array(hours * 2 + 1).keys()];

  hours = hours.map((hour) => hour / 2);

  const data = [];

  const effect = (t) => {
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
  };

  hours.forEach((hour) => {
    data.push(effect(hour));
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
  methylphenidate: { constant: 0.2, halfLife: 2.5, name: "Methylphenidate" },
};

const pills = [
  {
    name: "Ritalin MR",
    doses: [
      {
        drug: drugs.methylphenidate,
        releases: [0, 4],
      },
    ],
  },
  {
    name: "Ritalin IR",
    doses: [
      {
        drug: drugs.methylphenidate,
        releases: [0],
      },
    ],
  },
];

export default (prescription) => {
  const layers = [];

  prescription.forEach((pill) => {
    pills[pills.findIndex((p) => p.name === pill.name)].doses.forEach(
      (dose) => {
        dose.releases.forEach((release) => {
          layers.push(
            plasma(
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
