import React, { useState } from "react";

interface SportsFormProps {
  defaults: any;
  onSubmit: (payload: any) => void;
  loading: boolean;
}

export default function SportsForm({ defaults, onSubmit, loading }: SportsFormProps) {
  const [betSize, setBetSize] = useState(defaults.betSize ?? 1.0);
  const [rounds, setRounds] = useState(defaults.rounds ?? 100);

  const [winChance, setWinChance] = useState(defaults.winChance ?? 0.48);
  const [pushChance, setPushChance] = useState(defaults.pushChance ?? 0.02);
  const [payoutMultiplier, setPayoutMultiplier] = useState(defaults.payoutMultiplier ?? 1.9);

  const [oddsType, setOddsType] = useState(defaults.oddsType ?? "decimal");
  const [oddsValue, setOddsValue] = useState(defaults.oddsValue ?? 1.9);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      gameType: "sports",
      betSize: parseFloat(String(betSize)),
      rounds: parseInt(String(rounds)),
      winChance: parseFloat(String(winChance)),
      pushChance: parseFloat(String(pushChance)),
      payoutMultiplier: parseFloat(String(payoutMultiplier)),
      oddsType,
      oddsValue: parseFloat(String(oddsValue))
    });
  }

  return (
    <form id="sports-form" onSubmit={handleSubmit} className="space-y-4">
      <h3 id="sports-section-title" className="text-lg font-semibold text-gray-800">
        Sports Simulation Parameters
      </h3>

      <div id="bet-size-wrapper">
        <label htmlFor="sports-betSize" className="block text-sm font-medium text-gray-700">Bet Size</label>
        <input id="sports-betSize" type="number" step="0.01" value={betSize}
          onChange={(e) => setBetSize(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="rounds-wrapper">
        <label htmlFor="sports-rounds" className="block text-sm font-medium text-gray-700">Rounds</label>
        <input id="sports-rounds" type="number" value={rounds}
          onChange={(e) => setRounds(parseInt(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="win-chance-wrapper">
        <label htmlFor="sports-winChance" className="block text-sm font-medium text-gray-700">Win Chance (0–1)</label>
        <input id="sports-winChance" type="number" step="0.01" value={winChance}
          onChange={(e) => setWinChance(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="push-chance-wrapper">
        <label htmlFor="sports-pushChance" className="block text-sm font-medium text-gray-700">Push Chance (0–1)</label>
        <input id="sports-pushChance" type="number" step="0.01" value={pushChance}
          onChange={(e) => setPushChance(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="payout-multiplier-wrapper">
        <label htmlFor="sports-payoutMultiplier" className="block text-sm font-medium text-gray-700">Payout Multiplier</label>
        <input id="sports-payoutMultiplier" type="number" step="0.01" value={payoutMultiplier}
          onChange={(e) => setPayoutMultiplier(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <div id="odds-type-wrapper">
        <label htmlFor="sports-oddsType" className="block text-sm font-medium text-gray-700">Odds Type</label>
        <select id="sports-oddsType" value={oddsType}
          onChange={(e) => setOddsType(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500">
          <option value="decimal">Decimal</option>
          <option value="american">American</option>
        </select>
      </div>

      <div id="odds-value-wrapper">
        <label htmlFor="sports-oddsValue" className="block text-sm font-medium text-gray-700">Odds Value</label>
        <input id="sports-oddsValue" type="number" step="0.01" value={oddsValue}
          onChange={(e) => setOddsValue(parseFloat(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
      </div>

      <button id="sports-submit" type="submit" disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition">
        {loading ? "Running..." : "Run Sports Simulation"}
      </button>
    </form>
  );
}