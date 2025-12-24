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
                <div className={styles.privacyBadge} style={{ backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", borderRadius: "6px", marginBottom: "1rem" }}>
                    <Shield size={20} style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 500, fontSize: "0.95rem" }}>
                        【セキュリティ宣言】データはサーバーに送信されず、すべてブラウザ内で安全に処理されます。機密データの整形も安心してご利用いただけます。
                    </span>
                </div>
                <JsonWorkspaceJP />

                <details style={{ marginTop: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef", overflow: "hidden" }}>
                    <summary style={{ padding: "1rem", cursor: "pointer", fontWeight: "bold", color: "#2c3e50", outline: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Shield size={16} color="#28a745" />
                            プライバシーおよびセキュリティについて（詳細）
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "#6c757d", fontWeight: "normal" }}>クリックして展開</span>
                    </summary>
                    <div style={{ padding: "0 1.5rem 1.5rem 1.5rem", borderTop: "1px solid #e9ecef" }}>
                        <p style={{ margin: "1rem 0", fontSize: "0.9rem", color: "#666" }}>
                            当サイトは、ユーザーのプライバシーとデータセキュリティを最優先に設計されています。
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.25rem", color: "#0056b3" }}>1. クライアントサイド処理</h3>
                                <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.5 }}>
                                    JavaScriptを用いて、すべての処理をブラウザ内のみで実行します。
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.25rem", color: "#0056b3" }}>2. サーバー送信なし</h3>
                                <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.5 }}>
                                    入力データが外部サーバーに送信・保存されることは一切ありません。
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.25rem", color: "#0056b3" }}>3. ログの不保持</h3>
                                <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.5 }}>
                                    保存用データベースを持たないため、データの閲覧は技術的に不可能です。
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.25rem", color: "#0056b3" }}>4. 利用目的</h3>
                                <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.5 }}>
                                    機密情報を含むドキュメントやAPIレスポンスも安心して扱えます。
                                </p>
                            </div>
                        </div>
                    </div>
                </details>
            </main>
            <footer className={styles.footer}>
                <div style={{ marginBottom: "1rem", color: "#666", fontSize: "0.9rem", textAlign: "center", padding: "0 1rem" }}>
                    ※ 業務利用も可能です（商用利用無料）。APIキーやパスワードが含まれるJSONも、外部に漏れることはありません。
                </div>
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
