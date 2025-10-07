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

  const labels = result.outcomes.map((_: any, i: number) => `Round ${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        id: "result-dataset",
        label: "Round Outcomes",
        data: result.outcomes,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.2,
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
        <div id="results-rtp" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">RTP</p>
          <p className="text-xl font-bold text-blue-700">{result.rtp.toFixed(2)}%</p>
        </div>
        <div id="results-variance" className="p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">Variance</p>
          <p className="text-xl font-bold text-blue-700">{result.variance.toFixed(2)}</p>
        </div>
      </div>
      <div id="results-chart" className="h-64">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}