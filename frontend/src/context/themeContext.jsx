import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

/**
 * Wraps the app and provides theme state to any descendant via useTheme().
 * Initial value is read from localStorage, falling back to the OS preference.
 */
export function ThemeProvider({ children }) {
	const [dark, setDark] = useState(() => {
		const saved = localStorage.getItem("theme");
		if (saved) return saved === "dark";
		// No saved preference — defer to the OS setting
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	// Keep the data-theme attribute and localStorage in sync whenever dark changes
	useEffect(() => {
		document.documentElement.setAttribute(
			"data-theme",
			dark ? "dark" : "light",
		);
		localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);

	const toggle = () => setDark((d) => !d);

	return (
		<ThemeContext.Provider value={{ dark, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}

/** Returns { dark, toggle } from the nearest ThemeProvider. */
export function useTheme() {
	return useContext(ThemeContext);
}
