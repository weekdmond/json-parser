"use client";

import React, { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import styles from "../app/page.module.css";

type Theme = "github" | "solarized" | "paper";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>("github");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <div className={styles.themeSwitcher}>
            <Palette size={20} style={{ marginRight: "0.5rem" }} />
            <select
                value={theme}
                onChange={(e) => changeTheme(e.target.value as Theme)}
                className={styles.themeSelect}
            >
                <option value="github">GitHub Light</option>
                <option value="solarized">Solarized Light</option>
                <option value="paper">Paper (Minimal)</option>
            </select>
        </div>
    );
}
