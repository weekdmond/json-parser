import styles from "./page.module.css";
import JsonWorkspace from "../components/JsonWorkspace";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Braces, Shield, Github, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Braces size={32} />
          <span>JSON</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <ThemeSwitcher />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.privacyBadge}>
          <Shield size={18} />
          <span>🔒 Privacy First: All data processed locally in your browser. Nothing is uploaded to any server.</span>
        </div>
        <JsonWorkspace />
      </main>
      <footer className={styles.footer}>
        <span>100% Open Source & Privacy-First</span>
        <a href="https://github.com/weekdmond/json-parser" target="_blank" rel="noopener noreferrer">
          <Github size={16} />
          Star on GitHub
        </a>
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          Made with <Heart size={14} fill="#e74c3c" color="#e74c3c" /> for developers
        </span>
      </footer>
    </div>
  );
}
