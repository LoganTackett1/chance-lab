import React, { useState } from "react";

interface SlotFormProps {
  defaults: any;
  onSubmit: (payload: any) => void;
  loading: boolean;
}

export default function SlotForm({ defaults, onSubmit, loading }: SlotFormProps) {
  const [betSize, setBetSize] = useState(defaults.betSize ?? 1.0);
  const [rounds, setRounds] = useState(defaults.rounds ?? 100);

  const [smallWinChance, setSmallWinChance] = useState(defaults.smallWinChance ?? 0.15);
  const [bigWinChance, setBigWinChance] = useState(defaults.bigWinChance ?? 0.05);
  const [smallWinMultiplier, setSmallWinMultiplier] = useState(defaults.smallWinMultiplier ?? 2.0);
  const [bigWinMultiplier, setBigWinMultiplier] = useState(defaults.bigWinMultiplier ?? 10.0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      gameType: "slot",
      betSize: parseFloat(String(betSize)),
      rounds: parseInt(String(rounds)),
      smallWinChance: parseFloat(String(smallWinChance)),
      bigWinChance: parseFloat(String(bigWinChance)),
      smallWinMultiplier: parseFloat(String(smallWinMultiplier)),
      bigWinMultiplier: parseFloat(String(bigWinMultiplier))
    });
  }

  return (
    <form id="slot-form" onSubmit={handleSubmit} className="space-y-4">
      <h3 id="slot-section-title" className="text-lg font-semibold text-gray-800">
        Slot Simulation Parameters
      </h3>

      <div id="bet-size-wrapper">
        <label htmlFor="slot-betSize" className="block text-sm font-medium text-gray-700">Bet Size</label>
        <input id="slot-betSize" type="number" step="0.01" value={betSize}
          onChange={(e) => setBetSize(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="rounds-wrapper">
        <label htmlFor="slot-rounds" className="block text-sm font-medium text-gray-700">Rounds</label>
        <input id="slot-rounds" type="number" value={rounds}
          onChange={(e) => setRounds(parseInt(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="small-win-chance-wrapper">
        <label htmlFor="slot-smallWinChance" className="block text-sm font-medium text-gray-700">Small Win Chance (0–1)</label>
        <input id="slot-smallWinChance" type="number" step="0.01" value={smallWinChance}
          onChange={(e) => setSmallWinChance(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="big-win-chance-wrapper">
        <label htmlFor="slot-bigWinChance" className="block text-sm font-medium text-gray-700">Big Win Chance (0–1)</label>
        <input id="slot-bigWinChance" type="number" step="0.01" value={bigWinChance}
          onChange={(e) => setBigWinChance(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="small-win-multiplier-wrapper">
        <label htmlFor="slot-smallWinMultiplier" className="block text-sm font-medium text-gray-700">Small Win Multiplier</label>
        <input id="slot-smallWinMultiplier" type="number" step="0.1" value={smallWinMultiplier}
          onChange={(e) => setSmallWinMultiplier(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="big-win-multiplier-wrapper">
        <label htmlFor="slot-bigWinMultiplier" className="block text-sm font-medium text-gray-700">Big Win Multiplier</label>
        <input id="slot-bigWinMultiplier" type="number" step="0.1" value={bigWinMultiplier}
          onChange={(e) => setBigWinMultiplier(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <button id="slot-submit" type="submit" disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition">
        {loading ? "Running..." : "Run Slot Simulation"}
      </button>
    </form>
  );
}