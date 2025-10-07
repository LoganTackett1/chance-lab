import React, { useEffect, useState } from "react";
import { getDefaults, runSimulation } from "../api/api";
import SlotForm from "./SlotForm";
import SportsForm from "./SportsForm";

interface SimulationFormProps {
  onResult: (data: any) => void;
}

export default function SimulationForm({ onResult }: SimulationFormProps) {
  const [gameType, setGameType] = useState<"slot" | "sports">("slot");
  const [defaults, setDefaults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDefaults()
      .then((data) => setDefaults(data))
      .catch((err) => console.error("Failed to load defaults", err));
  }, []);

  if (!defaults)
    return (
      <div id="form-loading" className="text-center text-gray-500">
        Loading defaults...
      </div>
    );

  async function handleSubmit(payload: any) {
    setLoading(true);
    try {
      // Map frontend “Slots” to backend “slot”
      const request = { ...payload, gameType };
      const result = await runSimulation(request);
      onResult(result);
    } catch (err) {
      console.error(err);
      alert("Simulation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="simulation-form-container"
      className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md"
    >
      <h2
        id="form-title"
        className="text-2xl font-semibold mb-6 text-center text-gray-800"
      >
        Run a Simulation
      </h2>

      <div id="game-type-toggle" className="flex justify-center mb-6 space-x-4">
        <button
          id="select-slot"
          type="button"
          onClick={() => setGameType("slot")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            gameType === "slot"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Slots
        </button>
        <button
          id="select-sports"
          type="button"
          onClick={() => setGameType("sports")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            gameType === "sports"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sports
        </button>
      </div>

      {/* Conditional subform */}
      {gameType === "slot" ? (
        <SlotForm defaults={defaults} onSubmit={handleSubmit} loading={loading} />
      ) : (
        <SportsForm defaults={defaults} onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
}
