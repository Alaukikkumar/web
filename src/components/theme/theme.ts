export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
/** Dark is the brand default; a visitor's choice is remembered in localStorage. */
export const DEFAULT_THEME: Theme = "dark";
export const THEME_COLORS: Record<Theme, string> = { dark: "#08090a", light: "#f3f3ef" };

/** Applies the stored theme before first paint (see InlineScript). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
