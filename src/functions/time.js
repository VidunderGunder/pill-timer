let now = new Date(Date.now());

export const currentHours = Math.floor(
  now.getHours() + now.getMinutes() / 60 + 0.5
);
