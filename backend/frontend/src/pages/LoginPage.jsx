import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authApi';

const LoginPage = ({ onSwitch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await loginUser(username, password);
            login(token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="frame main-frame auth-frame">
                <div className="frame-header">
                    <h2>Iniciar Sesión</h2>
                </div>
                <form onSubmit={handleSubmit} className="topic-form">
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Tu nombre de usuario"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Entrar</button>
                </form>
                <p className="auth-footer">
                    ¿No tienes cuenta? <button onClick={onSwitch} className="btn-link">Regístrate</button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
