import { useEffect, useState, useCallback } from "react";
import { getHistory } from "../api/api";

interface SimulationRecord {
  id?: string;
  gameType: string;
  rtp: number;
  variance: number;
  createdAt?: string;
  betSize?: number;
}

interface HistoryPanelProps {
  refreshTrigger?: number; // incremented by parent when new sim runs
}

export default function HistoryPanel({ refreshTrigger }: HistoryPanelProps) {
  const [history, setHistory] = useState<SimulationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getHistory();
      setHistory(data || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to load simulation history:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Refresh when a new simulation finishes
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      fetchHistory();
    }
  }, [refreshTrigger, fetchHistory]);

  // Auto-refresh every 10s
  useEffect(() => {
    const interval = setInterval(fetchHistory, 10000);
    return () => clearInterval(interval);
  }, [fetchHistory]);

  return (
    <div
      id="history-panel-container"
      className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-[10px]">
        <h2
          id="history-panel-title"
          className="text-xl font-semibold text-gray-800"
        >
          Recent Simulations
        </h2>
        {/* Live indicator */}
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs text-gray-500">
            Live (updates every 10s)
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p id="history-panel-loading" className="text-gray-500 text-center">
          Loading...
        </p>
      )}

      {/* Empty state */}
      {!loading && history.length === 0 && (
        <p id="history-panel-empty" className="text-gray-500 text-center">
          No recent simulations found.
        </p>
      )}

      {/* Simulation list */}
      <ul id="history-list" className="divide-y divide-gray-200">
        {history.map((item, i) => {
          const dateStr = item.createdAt
            ? new Date(item.createdAt).toLocaleString()
            : "Unknown Date";

          return (
            <li
              key={item.id ?? i}
              className="py-3 flex flex-col sm:flex-row justify-between sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-semibold text-gray-800 capitalize">
                  {item.gameType}
                </p>
                <p className="text-sm text-gray-500">{dateStr}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">
                  RTP:{" "}
                  <span className="font-semibold text-blue-700">
                    {item.rtp?.toFixed(2)}%
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Variance:{" "}
                  <span className="font-semibold text-blue-700">
                    {item.variance?.toFixed(2)}
                  </span>
                </p>
                {item.betSize !== undefined && (
                  <p className="text-sm text-gray-600">
                    Bet Size:{" "}
                    <span className="font-semibold text-blue-700">
                      {item.betSize.toFixed(2)}
                    </span>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Last Updated */}
      {lastUpdated && (
        <p
          id="history-last-updated"
          className="text-xs text-gray-400 text-center mt-4"
        >
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}