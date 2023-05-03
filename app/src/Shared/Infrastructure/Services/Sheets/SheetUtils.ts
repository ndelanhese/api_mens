/* eslint-disable @typescript-eslint/no-explicit-any */
import xlsx from 'xlsx';

export const resizeColumns = (workSheet: xlsx.WorkSheet) => {
  const columnWidths: any = xlsx.utils
    .sheet_to_json(workSheet, { header: 1 })
    .reduce((acc: any, row: any) => {
      row.forEach((cell: any, index: number) => {
        const width: number = cell ? cell.toString().length : 0;
        acc[index] = Math.max(acc[index] || 0, width);
      });
      return acc;
    }, {});
  workSheet['!cols'] = Object.keys(columnWidths).map((col: string) => {
    const width = columnWidths[col] + 2;
    const LIMIT_OF_WIDTH = 80;
    return {
      width: Math.min(width, LIMIT_OF_WIDTH),
    };
  });
  return workSheet;
};
