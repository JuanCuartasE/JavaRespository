import { useEffect, useState } from "react";
import { getTopics, createTopic, updateTopic } from "../services/topicsApi";
import { useTheme } from "../context/ThemeContext";

export default function TopicsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTopics();
  }, []);

  async function loadTopics() {
    setLoading(true);
    try {
      const data = await getTopics();
      setTopics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateTopic(editingId, { title, description });
      } else {
        await createTopic({ title, description });
      }

      setTitle("");
      setDescription("");
      setEditingId(null);
      loadTopics();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  function startEdit(topic) {
    setEditingId(topic.id);
    setTitle(topic.title);
    setDescription(topic.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setDescription("");
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>Paradigmas Lab</h1>
        <button className="theme-toggle" onClick={toggleTheme} title="Cambiar tema">
          {isDark ? "☀️" : "🌙"}
        </button>
      </nav>

      <div className="glass-card">
        <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
          {editingId ? "📝 Editar Tema" : "✨ Crear Nuevo Tema"}
        </h2>
        <form className="topic-form" onSubmit={handleSubmit}>
          <input
            placeholder="¿De qué quieres hablar?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            required
          />
          <textarea
            placeholder="Añade una descripción detallada..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
            rows="3"
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn-primary" type="submit" disabled={loading} style={{ flex: 1 }}>
              {loading ? "..." : (editingId ? "Actualizar Tema" : "Publicar Tema")}
            </button>
            {editingId && (
              <button className="btn-edit" type="button" onClick={cancelEdit}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="topic-grid">
        {topics.map(t => (
          <div key={t.id} className="glass-card topic-item">
            <div>
              <h3>{t.title}</h3>
              <p>{t.description || "Sin descripción"}</p>
            </div>
            <div className="topic-actions">
              <button className="btn-edit" onClick={() => startEdit(t)}>
                ✏️ Editar
              </button>
            </div>
          </div>
        ))}

        {!loading && topics.length === 0 && (
          <div className="glass-card" style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--text-dim)" }}>
            No hay temas creados todavía. ¡Sé el primero!
          </div>
        )}
      </div>
    </div>
  );
}
