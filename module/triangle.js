export function getOddTriangleRow(rowIndex) {
  const row = new Array(rowIndex);
  row[0] = 1;
  for (let i = 1, j = 1; i < rowIndex; i++, j += 2) {
    row[i] = row[i - 1] + j;
  }
  return row.join(' ');
}