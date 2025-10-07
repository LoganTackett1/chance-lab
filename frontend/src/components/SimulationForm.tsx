import React, { useState, useEffect } from "react";
import { getDefaults, runSimulation } from "../api/api";

export default function SimulationForm() {
const [form, setForm] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);

useEffect(() => {
    getDefaults().then(setForm).catch(console.error);
}, []);

if (!form) return <div id="form-loading">Loading defaults...</div>;

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    const data = await runSimulation(form);
    setResult(data);
    } catch (err) {
    alert("Error running simulation");
    } finally {
    setLoading(false);
    }
};

return (
    <div id="simulation-form-container" className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
    <h2 id="form-title" className="text-2xl font-semibold mb-4 text-center">Run a Simulation</h2>
    <form id="simulation-form" onSubmit={handleSubmit} className="space-y-4">
        <div id="bet-size-wrapper">
        <label htmlFor="betSize" className="block text-sm font-medium text-gray-700">Bet Size</label>
        <input
            id="bet-size-input"
            type="number"
            name="betSize"
            value={form.betSize}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        </div>

        <div id="rounds-wrapper">
        <label htmlFor="rounds" className="block text-sm font-medium text-gray-700">Rounds</label>
        <input
            id="rounds-input"
            type="number"
            name="rounds"
            value={form.rounds}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        </div>

        <div id="game-type-wrapper">
        <label htmlFor="gameType" className="block text-sm font-medium text-gray-700">Game Type</label>
        <select
            id="game-type-select"
            name="gameType"
            value={form.gameType}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="slots">Slots</option>
            <option value="sports">Sports</option>
        </select>
        </div>

        <button
        id="run-simulation-button"
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
        {loading ? "Running..." : "Run Simulation"}
        </button>
    </form>

    {result && (
        <div id="result-container" className="mt-6 border-t pt-4">
        <h3 id="result-title" className="text-lg font-semibold text-gray-800 mb-2">Results</h3>
        <p id="result-rtp">RTP: {result.rtp.toFixed(2)}%</p>
        <p id="result-variance">Variance: {result.variance.toFixed(2)}</p>
        </div>
    )}
    </div>
);
}
