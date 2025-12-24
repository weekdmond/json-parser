import styles from "../page.module.css";
import JsonWorkspaceJP from "../../components/JsonWorkspaceJP";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { Braces, Shield, Github, Heart } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON整形・解析ツール (完全オフライン/高セキュリティ) - JSON Formatter & Validator",
    description: "登録不要・完全オフラインのJSON整形（フォーマット）ツール。データはサーバーに送信されず、ブラウザ内で安全に処理されます。JSONのバリデーション、圧縮、比較（Diff）にも対応。日本語対応で高速動作。",
    keywords: ["JSON整形", "JSON解析", "JSONパース", "JSONフォーマット", "JSONバリデーション", "完全オフライン", "登録不要", "サーバー送信なし"],
    openGraph: {
        locale: 'ja_JP',
        title: 'JSON整形・解析ツール (完全オフライン/高セキュリティ)',
        description: '登録不要・完全オフライン。データはサーバーに送信されず、ブラウザ内で安全に処理されます。',
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
