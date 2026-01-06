import { useEffect, useState } from "react";
import { getTopics, createTopic, updateTopic } from "../services/topicsApi";

export default function TopicsPage() {
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
    if (!title.trim()) return;
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
  }

  return (
    <div className="frame-container">
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '2.5rem', fontWeight: '700' }}>
          {editingId ? "Edit Topic" : "What's on your mind?"}
        </h1>
      </header>

      <div className="input-frame">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Topic Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            required
          />
          <textarea
            placeholder="Add a detailed description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
            rows="3"
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => { setEditingId(null); setTitle(""); setDescription(""); }}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : (editingId ? "Save Changes" : "Create Topic")}
            </button>
          </div>
        </form>
      </div>

      <div className="topic-list">
        {topics.map(t => (
          <div key={t.id} className="topic-card" onClick={() => startEdit(t)}>
            <h3>{t.title}</h3>
            <p>{t.description || "No description provided."}</p>
            <div style={{ alignSelf: 'flex-end', fontSize: '0.8rem', opacity: 0.6 }}>
              Click to Edit
            </div>
          </div>
        ))}

        {!loading && topics.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
            No topics yet. Start by creating one above!
          </div>
        )}
      </div>
    </div>
  );
}
