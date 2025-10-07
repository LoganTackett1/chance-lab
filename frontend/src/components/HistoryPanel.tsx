import { useEffect, useState } from "react";
import { getHistory } from "../api/api";

export default function HistoryPanel() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then((data) => setHistory(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      id="history-panel-container"
      className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md"
    >
      <h2 id="history-panel-title" className="text-2xl font-semibold mb-4 text-center">
        Recent Simulations
      </h2>

      {loading ? (
        <p id="history-loading" className="text-center text-gray-500">
          Loading...
        </p>
      ) : history.length === 0 ? (
        <p id="history-empty" className="text-center text-gray-400">
          No recent simulations yet.
        </p>
      ) : (
        <ul id="history-list" className="divide-y divide-gray-200">
          {history.map((item, idx) => (
            <li
              key={idx}
              id={`history-item-${idx}`}
              className="py-3 flex items-center justify-between hover:bg-gray-50 rounded-md px-2 transition-colors"
            >
              <div id={`history-info-${idx}`} className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {item.gameType?.toUpperCase() || "Unknown"}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <div id={`history-stats-${idx}`} className="text-right">
                <p className="text-blue-700 text-sm font-medium">
                  RTP: {item.rtp?.toFixed(2)}%
                </p>
                <p className="text-gray-600 text-sm">Var: {item.variance?.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}