import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface ResultsDisplayProps {
  result: any;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  if (!result) return null;

  // Derived metrics
  const avgReturn =
    result.totalReturned && result.request?.rounds
      ? result.totalReturned / result.request.rounds
      : 0;

  const winCount =
    result.outcomes?.filter((v: number) => v > 0).length ?? 0;
  const winRate =
    result.outcomes?.length > 0
      ? (winCount / result.outcomes.length) * 100
      : 0;

  // Build cumulative data for chart
  const cumulative = useMemo(() => {
    if (!Array.isArray(result.outcomes)) return [];
    return result.outcomes.reduce((acc: number[], val: number, i: number) => {
      acc.push((acc[i - 1] || 0) + val);
      return acc;
    }, []);
  }, [result.outcomes]);

  const chartData = {
    labels: cumulative.map((_:any, i:number) => i + 1),
    datasets: [
      {
        id: "cumulative",
        label: "Cumulative Return",
        data: cumulative,
        borderColor: "rgb(37,99,235)",
        backgroundColor: "rgba(37,99,235,0.25)",
        tension: 0.25,
        fill: true,
      },
    ],
  };

  return (
    <div
      id="results-display-container"
      className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-md"
    >
      <h2
        id="results-display-title"
        className="text-2xl font-semibold mb-6 text-center text-gray-800"
      >
        Simulation Results
      </h2>

      {/* KPI Cards */}
      <div
        id="results-stats"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center mb-8"
      >
        <div id="total-wagered" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">Total Wagered</p>
          <p className="text-xl font-bold text-blue-700">
            {result.totalWagered?.toFixed(2) ?? "–"}
          </p>
        </div>

        <div id="total-returned" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">Total Returned</p>
          <p className="text-xl font-bold text-blue-700">
            {result.totalReturned?.toFixed(2) ?? "–"}
          </p>
        </div>

        <div id="results-rtp" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">RTP (%)</p>
          <p className="text-xl font-bold text-blue-700">
            {result.rtp?.toFixed(2) ?? "–"}
          </p>
        </div>

        <div id="results-variance" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">Variance</p>
          <p className="text-xl font-bold text-blue-700">
            {result.variance?.toFixed(2) ?? "–"}
          </p>
        </div>

        <div id="avg-return" className="p-3 bg-blue-50 rounded-xl col-span-2 sm:col-span-1">
          <p className="text-sm text-gray-600">Avg Return / Round</p>
          <p className="text-xl font-bold text-blue-700">
            {avgReturn.toFixed(3)}
          </p>
        </div>

        <div id="win-rate" className="p-3 bg-blue-50 rounded-xl col-span-2 sm:col-span-1">
          <p className="text-sm text-gray-600">Win Rate (%)</p>
          <p className="text-xl font-bold text-blue-700">
            {winRate.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Cumulative Return Chart */}
      <div id="results-chart" className="h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "top" },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              x: {
                title: { display: true, text: "Round Number" },
                ticks: {
                  maxTicksLimit: 10,
                },
              },
              y: {
                title: { display: true, text: "Cumulative Return" },
              },
            },
            elements: {
              point: { radius: 0 },
            },
          }}
        />
      </div>
    </div>
  );
}