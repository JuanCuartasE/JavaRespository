import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { isDark, toggleTheme } = useTheme();
    const { logout } = useAuth();

    return (
        <aside className="sidebar">
            <div>
                <h2 className="sidebar-title">Paradigmas Lab</h2>
                <ul className="nav-list">
                    <li className="nav-item active">
                        <span>📥</span> Inbox
                    </li>
                    <li className="nav-item">
                        <span>🔖</span> Topics
                    </li>
                    <li className="nav-item">
                        <span>📅</span> Upcoming
                    </li>
                    <li className="nav-item">
                        <span>✅</span> Done
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
