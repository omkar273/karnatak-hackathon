export function getRandomInteger(min: number, max: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomInt;
}
