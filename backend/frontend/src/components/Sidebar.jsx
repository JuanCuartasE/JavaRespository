import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { isDark, toggleTheme } = useTheme();
    const { logout } = useAuth();

    return (
        <aside className="sidebar">
            <div>
                <h2 className="sidebar-title">Motor de Priorización</h2>
                <ul className="nav-list">
                    <li className="nav-item active">
                        <span>📥</span> Inbox (Solicitudes)
                    </li>
                    <li className="nav-item" onClick={() => window.open('https://javarespository.onrender.com/swagger-ui/index.html#/', '_blank')}>
                        <span>🚀</span> Swagger UI
                    </li>
                </ul>
            </div>

            <div className="footer-sidebar">
                <button className="btn-logout" onClick={logout}>
                    <span>🚪</span> Cerrar Sesión
                </button>
                <div className="theme-switch" onClick={toggleTheme}>
                    <div className={`theme-icon ${!isDark ? 'active' : ''}`}>☀️</div>
                    <div className={`theme-icon ${isDark ? 'active' : ''}`}>🌙</div>
                </div>
            </div>
        </aside>
    );
}
