export const calculatePercent = (amount, total) => ((amount / total) * 100);
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export function gameDate() {
  const res = new Date().toLocaleString('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
  });
  return res;
}
