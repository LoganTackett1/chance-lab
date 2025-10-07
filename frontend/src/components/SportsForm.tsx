import React, { useState } from "react";

interface SportsFormProps {
  defaults: any;
  onSubmit: (payload: any) => void;
  loading: boolean;
}

export default function SportsForm({ defaults, onSubmit, loading }: SportsFormProps) {
  const [betSize, setBetSize] = useState(defaults.betSize || 1);
  const [rounds, setRounds] = useState(defaults.rounds || 10);
  const [oddsFormat, setOddsFormat] = useState(defaults.oddsFormat || "decimal");
  const [winOdds, setWinOdds] = useState(defaults.winOdds || 2.5);
  const [loseOdds, setLoseOdds] = useState(defaults.loseOdds || 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
        betSize: parseFloat(betSize),
        rounds: parseInt(rounds),
        oddsType: oddsFormat,
        oddsValue: parseFloat(winOdds)
    });
  }

  return (
    <form id="sports-form" onSubmit={handleSubmit} className="space-y-4">
      <div id="bet-size-wrapper">
        <label htmlFor="sports-betSize" className="block text-sm font-medium text-gray-700">
          Bet Size
        </label>
        <input
          id="sports-betSize"
          type="number"
          step="0.01"
          value={betSize}
          onChange={(e) => setBetSize(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div id="rounds-wrapper">
        <label htmlFor="sports-rounds" className="block text-sm font-medium text-gray-700">
          Rounds
        </label>
        <input
          id="sports-rounds"
          type="number"
          value={rounds}
          onChange={(e) => setRounds(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div id="odds-format-wrapper">
        <label htmlFor="sports-oddsFormat" className="block text-sm font-medium text-gray-700">
          Odds Format
        </label>
        <select
          id="sports-oddsFormat"
          value={oddsFormat}
          onChange={(e) => setOddsFormat(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="decimal">Decimal</option>
          <option value="american">American</option>
        </select>
      </div>

      <div id="win-odds-wrapper">
        <label htmlFor="sports-winOdds" className="block text-sm font-medium text-gray-700">
          Win Odds
        </label>
        <input
          id="sports-winOdds"
          type="number"
          step="0.01"
          value={winOdds}
          onChange={(e) => setWinOdds(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div id="lose-odds-wrapper">
        <label htmlFor="sports-loseOdds" className="block text-sm font-medium text-gray-700">
          Lose Odds
        </label>
        <input
          id="sports-loseOdds"
          type="number"
          step="0.01"
          value={loseOdds}
          onChange={(e) => setLoseOdds(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        id="sports-submit"
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Running..." : "Run Sports Simulation"}
      </button>
    </form>
  );
}
