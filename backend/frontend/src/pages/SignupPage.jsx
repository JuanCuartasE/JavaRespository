import { useState } from 'react';
import { signupUser } from '../services/authApi';

const SignupPage = ({ onSwitch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USUARIO_COMUN');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupUser({ username, password, role });
            setSuccess(true);
            setTimeout(onSwitch, 2000); // Switch to login after 2 seconds
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="frame main-frame auth-frame">
                <div className="frame-header">
                    <h2>Crear Cuenta</h2>
                </div>
                {success ? (
                    <div className="success-state">
                        <p>¡Registro exitoso! Redirigiendo...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="topic-form">
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nombre de usuario"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Rol</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="USUARIO_COMUN">Usuario Común</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="OWNER">Owner (Control Total)</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary">Registrarse</button>
                    </form>
                )}
                <p className="auth-footer">
                    ¿Ya tienes cuenta? <button onClick={onSwitch} className="btn-link">Inicia Sesión</button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
