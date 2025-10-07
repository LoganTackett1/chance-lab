import { useState } from "react";
import SimulationForm from "./components/SimulationForm";
import ResultsDisplay from "./components/ResultsDisplay";
import HistoryPanel from "./components/HistoryPanel";

function HomePage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div id="home-page" className="min-h-screen bg-gray-100 py-10">
      <h1 id="app-title" className="text-3xl font-bold text-center mb-8 text-gray-800">
        Simulation Playground
      </h1>
      <SimulationForm />
      <ResultsDisplay result={result} />
      <HistoryPanel />
    </div>
  );
}

export default HomePage;
