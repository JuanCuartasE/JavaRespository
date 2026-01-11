import { useState, useEffect } from 'react';
import { getSortedRequests, createRequest } from '../services/requestsApi';
import { useAuth } from '../context/AuthContext';

const RequestPage = () => {
    const { user: authUser } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [type, setType] = useState('CONSULTA');
    const [manualPriority, setManualPriority] = useState(3);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const data = await getSortedRequests();
            setRequests(data);
        } catch (err) {
            setError('Error al cargar las solicitudes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
        // Poll every 30 seconds to update priorities based on time
        const interval = setInterval(fetchRequests, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // We don't send 'user' here anymore because the backend takes it from the Token (authentication.getName())
            await createRequest({ type, manualPriority });
            setType('CONSULTA');
            setManualPriority(3);
            fetchRequests();
        } catch (err) {
            alert('Error al crear la solicitud');
        }
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Motor de Priorización</h1>
                <p>Bienvenido, <strong>{authUser?.username}</strong> ({authUser?.role})</p>
            </header>

            <div className="frames-grid">
                {/* Form Frame */}
                <section className="frame main-frame">
                    <div className="frame-header">
                        <h2>Nueva Solicitud</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="topic-form">
                        <div className="form-group">
                            <label>Tipo de Solicitud</label>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="INCIDENTE">Incidente (Alta Prioridad)</option>
                                <option value="REQUERIMIENTO">Requerimiento</option>
                                <option value="CONSULTA">Consulta</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Prioridad Manual (1-5): {manualPriority}</label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={manualPriority}
                                onChange={(e) => setManualPriority(parseInt(e.target.value))}
                            />
                        </div>

                        <button type="submit" className="btn-primary">Registrar Solicitud</button>
                    </form> section
                </section>

                {/* List Frame */}
                <section className="frame sidebar-frame">
                    <div className="frame-header">
                        <h2>Orden de Atención</h2>
                        {loading && <span className="loading-badge">Actualizando...</span>}
                    </div>

                    <div className="topic-list">
                        {requests.map((req) => (
                            <div key={req.id} className="topic-card">
                                <div className="topic-content">
                                    <div className="topic-meta">
                                        <span className={`status-badge ${req.type.toLowerCase()}`}>
                                            {req.type}
                                        </span>
                                        <span className="priority-score">
                                            Puntaje: {Number(req.calculatedPriority).toFixed(1)}
                                        </span>
                                    </div>
                                    <h3>{req.user}</h3>
                                    <p>Prioridad Manual: {req.manualPriority}</p>
                                </div>
                            </div>
                        ))}
                        {requests.length === 0 && !loading && (
                            <p className="empty-state">No hay solicitudes pendientes</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RequestPage;
