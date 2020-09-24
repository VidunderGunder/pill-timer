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

    return (constant * Math.exp(-k * (t - (timeToTop + delay))));
  };

  hours.forEach((hour) => {
    data.push(effect(hour));
  });

  return data;
};

const arrayToNivo = (array) => {
  const nivo = [];

  array.forEach((element, hour) => {
    nivo.push({ x: hour, y: element.toFixed(1) });
  });

  return nivo;
};

const drugs = {
  methylfenidate: { constant: 0.2, halfLife: 2.5, name: "Methylfenidate" },
};

const pills = [{
  name: "Ritalin MR",
  doses: [
    {
      drug: drugs.methylfenidate,
      releases: [0, 4],
    },
  ],
}, {
  name: "Ritalin IR",
  doses: [
    {
      drug: drugs.methylfenidate,
      releases: [0],
    },
  ],
}];

export default (prescription) => {
  const layers = [];

  prescription.forEach((pill) => {
    pills[pills.findIndex((p) => p.name === pill.name)].doses.forEach(
      (dose) => {
        dose.releases.forEach((release) => {
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

  const sum = layers.reduce((a, b) => {
    return a.map((element, index) => {
      const elementWiseSum = parseFloat(element) + parseFloat(b[index]);
      return elementWiseSum;
    });
  });

  return arrayToNivo(sum);
};
