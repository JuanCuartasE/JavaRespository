const API_URL = "/api/topics";

export async function getTopics() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al cargar topics");
  return res.json();
}

export async function createTopic(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear topic");
  return res.json();
}

export async function updateTopic(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar topic");
  return res.json();
}
