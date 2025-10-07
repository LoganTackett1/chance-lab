import React from "react";
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

  const labels = result.outcomes.map((_: number, i: number) => `Round ${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        id: "outcomes",
        label: "Return per Round",
        data: result.outcomes,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        tension: 0.25,
        fill: true,
      },
    ],
  };

  return (
    <div
      id="results-display-container"
      className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-md"
    >
      <h2 id="results-display-title" className="text-2xl font-semibold mb-4 text-center">
        Simulation Results
      </h2>

      <div id="results-stats" className="grid grid-cols-2 gap-4 text-center mb-6">
        <div id="total-wagered" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">Total Wagered</p>
          <p className="text-xl font-bold text-blue-700">
            {result.totalWagered.toFixed(2)}
          </p>
        </div>
        <div id="total-returned" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">Total Returned</p>
          <p className="text-xl font-bold text-blue-700">
            {result.totalReturned.toFixed(2)}
          </p>
        </div>
        <div id="results-rtp" className="p-3 bg-blue-50 rounded-xl col-span-1">
          <p className="text-sm text-gray-600">RTP (%)</p>
          <p className="text-xl font-bold text-blue-700">
            {result.rtp.toFixed(2)}
          </p>
        </div>
        <div id="results-variance" className="p-3 bg-blue-50 rounded-xl col-span-1">
          <p className="text-sm text-gray-600">Variance</p>
          <p className="text-xl font-bold text-blue-700">
            {result.variance.toFixed(2)}
          </p>
        </div>
      </div>

      <div id="results-chart" className="h-64">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}