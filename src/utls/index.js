export const calculatePercent = (amount, total) => ((amount / total) * 100);
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export function gameDate() {
  const res = new Date().toString();
  return res.slice(4, 24);
}
