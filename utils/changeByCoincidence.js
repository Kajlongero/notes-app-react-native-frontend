export const changeByCoincidence = (note, data, coincidence) => {
  const newArrToUpdate = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i][coincidence] === note[coincidence]) {
      newArrToUpdate.push({ ...note });
      continue;
    }
    if (data[i][coincidence] !== note[coincidence]) {
      newArrToUpdate.push({ ...data[i] });
    }
  }

  return newArrToUpdate;
};
