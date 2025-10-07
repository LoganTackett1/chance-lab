import { useState } from "react";
import SimulationForm from "../components/SimulationForm";
import ResultsDisplay from "../components/ResultsDisplay";
import HistoryPanel from "../components/HistoryPanel";

export default function HomePage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div id="home-page" className="min-h-screen bg-gray-100 py-10">
      <h1
        id="app-title"
        className="text-3xl font-bold text-center mb-10 text-gray-800"
      >
        Simulation Playground
      </h1>

      <div id="main-content" className="flex flex-col items-center space-y-8">
        <SimulationForm onResult={setResult} />
        <ResultsDisplay result={result} />
        <HistoryPanel />
      </div>
    </div>
  );
}
