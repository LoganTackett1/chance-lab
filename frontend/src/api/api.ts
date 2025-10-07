const API_BASE = "https://localhost:5001/api/simulation";

export async function getDefaults() {
  const res = await fetch(`${API_BASE}/defaults`);
  if (!res.ok) throw new Error("Failed to load defaults");
  return res.json();
}

export async function runSimulation(payload: any) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Simulation failed");
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}
