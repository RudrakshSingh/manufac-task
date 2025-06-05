import { useEffect, useState } from "react";
import { MantineProvider, Paper, Table } from "@mantine/core";
import { BarChart } from "./components/BarChart";
import type { CropData, YearlyCropStats } from "./types";
import { getYearlyMaxMinCrops, getAverageProductionPerCrop } from "./dataUtils";
import rawData from "./data/dataset.json";
import "./styles.css";

function App() {
  const [tableData, setTableData] = useState<YearlyCropStats[]>([]);
  const [averageData, setAverageData] = useState<Record<string, number>>({});

  useEffect(() => {
    const parsed: CropData[] = (rawData as unknown as CropData[]).map(
      (item) => ({
        Year: item.Year,
        Crop: item.Crop,
        Production: parseFloat(item.Production.toString()) || 0,
      })
    );

    setTableData(getYearlyMaxMinCrops(parsed));
    setAverageData(getAverageProductionPerCrop(parsed));
  }, []);

  return (
    <MantineProvider theme={{ primaryColor: "blue" }}>
      {/* Add these lines if you want global styles and normalize CSS */}
      {/* <GlobalStyles /> */}
      {/* <NormalizeCSS /> */}
      <Paper p="lg">
        <h2>Crop Production Summary</h2>

        <Table className="my-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Max Production Crop</th>
              <th>Min Production Crop</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(({ year, maxCrop, minCrop }) => (
              <tr key={year}>
                <td>{year}</td>
                <td>{maxCrop}</td>
                <td>{minCrop}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <BarChart data={averageData} />
      </Paper>
    </MantineProvider>
  );
}

export default App;
