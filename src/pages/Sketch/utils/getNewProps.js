export default function (startPoint, x, y) {
  const x1 = x < startPoint.x ? x : startPoint.x;
  const y1 = y < startPoint.y ? y : startPoint.y;
  const x2 = x > startPoint.x ? x : startPoint.x;
  const y2 = y > startPoint.y ? y : startPoint.y;

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
