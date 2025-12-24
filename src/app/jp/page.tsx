import styles from "../page.module.css";
import JsonWorkspaceJP from "../../components/JsonWorkspaceJP";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { Braces, Shield, Github, Heart } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON整形・解析ツール (完全オフライン/高セキュリティ) - JSON Formatter Japan",
    description: "完全オフライン動作で安全なJSON整形ツール。Excel/CSV出力対応、全角数字の自動修正機能付き。サーバーへの送信は一切ありません。",
    keywords: ["JSON整形", "JSON解析", "JSON Formatter", "JSON Validator", "JSON CSV変換", "オフライン", "セキュリティ"],
    openGraph: {
        locale: 'ja_JP',
        title: 'JSON整形・解析ツール (完全オフライン)',
        description: 'インストール不要・完全オフライン動作。Excel出力対応の日本製JSONツール。',
    }
};

export default function HomeJP() {
    return (
        <div className={styles.container}>
            <header className={styles.header} style={{ borderBottom: "1px solid #28a745" }}>
                <div className={styles.logo}>
                    <Braces size={32} color="#28a745" />
                    <span>JSON解析</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <ThemeSwitcher />
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.privacyBadge} style={{ backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }}>
                    <Shield size={18} />
                    <span>🔒 完全オフライン動作 / サーバー送信なし (Security First)</span>
                </div>
                <JsonWorkspaceJP />
            </main>
            <footer className={styles.footer}>
                <span>完全無料・オープンソース</span>
                <a href="https://github.com/weekdmond/json-parser" target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    GitHubでスター
                </a>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    Made with <Heart size={14} fill="#e74c3c" color="#e74c3c" /> for developers
                </span>
            </footer>
        </div>
    );
}
