import { CropData, YearlyCropStats } from "./types";

export function getYearlyMaxMinCrops(data: CropData[]): YearlyCropStats[] {
  const grouped = data.reduce<Record<string, CropData[]>>((acc, item) => {
    acc[item.Year] = acc[item.Year] || [];
    acc[item.Year].push(item);
    return acc;
  }, {});

  return Object.entries(grouped).map(([year, crops]) => {
    const sorted = [...crops].sort((a, b) => b.Production - a.Production);
    return {
      year,
      maxCrop: sorted[0].Crop,
      minCrop: sorted[sorted.length - 1].Crop,
    };
  });
}

export function getAverageProductionPerCrop(
  data: CropData[]
): Record<string, number> {
  const totals: Record<string, { total: number; count: number }> = {};

  data.forEach(({ Crop, Production }) => {
    if (!totals[Crop]) totals[Crop] = { total: 0, count: 0 };
    totals[Crop].total += Production;
    totals[Crop].count++;
  });

  return Object.fromEntries(
    Object.entries(totals).map(([crop, { total, count }]) => [
      crop,
      parseFloat((total / count).toFixed(2)),
    ])
  );
}
