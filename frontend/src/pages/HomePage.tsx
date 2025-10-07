import { useState } from "react";
import SimulationForm from "../components/SimulationForm";
import ResultsDisplay from "../components/ResultsDisplay";
import HistoryPanel from "../components/HistoryPanel";

export default function HomePage() {
  const [result, setResult] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleSimulationResult(newResult: any) {
    setResult(newResult);
    setRefreshTrigger((r) => r + 1);
  }

  return (
    <div id="home-page" className="min-h-screen bg-gray-100 py-10">
      {/* Header */}
      <h1
        id="app-title"
        className="text-3xl font-bold text-center mb-4 text-gray-800"
      >
        Simulation Performance Dashboard
      </h1>

      {/* Intro section */}
      <div
        id="intro-section"
        className="max-w-2xl mx-auto text-center text-gray-700 mb-10 px-6"
      >
        <p className="mb-4">
          This dashboard allows you to run and analyze probability-based
          simulations for <strong>slot</strong> and <strong>sports</strong>{" "}
          betting models.
        </p>
        <p>
          Configure your parameters, run a simulation, and review results such as
          RTP (Return to Player), variance, and win rate. Recent simulations are
          automatically logged below for comparison.
        </p>
      </div>

      {/* Main content */}
      <div id="main-content" className="flex flex-col items-center space-y-8">
        <SimulationForm onResult={handleSimulationResult} />
        <ResultsDisplay result={result} />
        <HistoryPanel refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
