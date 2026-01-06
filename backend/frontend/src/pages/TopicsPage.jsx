import { useEffect, useState } from "react";
import { getTopics, createTopic, updateTopic } from "../services/topicsApi";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTopics();
  }, []);

  async function loadTopics() {
    const data = await getTopics();
    setTopics(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await updateTopic(editingId, { title, description });
    } else {
      await createTopic({ title, description });
    }

    setTitle("");
    setDescription("");
    setEditingId(null);
    loadTopics();
  }

  function startEdit(topic) {
    setEditingId(topic.id);
    setTitle(topic.title);
    setDescription(topic.description);
  }

  return (
    <div>
      <h1>Paradigmas Lab</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <ul>
        {topics.map(t => (
          <li key={t.id}>
            <b>{t.title}</b> — {t.description}
            <button onClick={() => startEdit(t)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
