export default function (startPoint, x, y) {
  const x1 = Math.min(startPoint.x, x);
  const y1 = Math.min(startPoint.y, y);
  const x2 = Math.max(startPoint.x, x);
  const y2 = Math.max(startPoint.y, y);

  const width = x2 - x1;
  const height = y2 - y1;
  
  const borderRadius =
    y2 - y1 < 5 || x2 - x1 < 5
      ? y2 - y1 < x2 - x1
        ? Math.floor(y2 - y1)
        : Math.floor(x2 - x1)
      : 5;
  return { x: x1, y: y1, width, height, borderRadius };
}
