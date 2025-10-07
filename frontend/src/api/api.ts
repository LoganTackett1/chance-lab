const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export async function getDefaults() {
  const res = await fetch(`${API_BASE}/api/simulation/defaults`);
  if (!res.ok) throw new Error("Failed to fetch defaults");
  return res.json();
}

export async function runSimulation(payload: any) {
  const res = await fetch(`${API_BASE}/api/simulation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Simulation failed");
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/api/simulation/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}