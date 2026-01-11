import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true; // Default to dark
    });

    useEffect(() => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            root.classList.remove("light");
            root.style.colorScheme = "dark";
        } else {
            root.classList.add("light");
            root.classList.remove("dark");
            root.style.colorScheme = "light";
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
