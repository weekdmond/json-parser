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

                <section style={{ marginTop: "3rem", padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef" }}>
                    <h2 style={{ fontSize: "1.25rem", color: "#2c3e50", marginBottom: "1.5rem", borderBottom: "2px solid #28a745", paddingBottom: "0.5rem", display: "inline-block" }}>
                        プライバシーおよびセキュリティについて
                    </h2>
                    <p style={{ marginBottom: "1rem", lineHeight: 1.6 }}>
                        当サイト（以下「本ツール」）は、ユーザーのプライバシーとデータセキュリティを最優先に設計されています。
                    </p>
                    <div style={{ display: "grid", gap: "1.5rem" }}>
                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#0056b3" }}>1. 完全クライアントサイド処理 (Client-side Processing)</h3>
                            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                                本ツールは、JavaScriptを用いてすべてのデータ処理（整形、解析、圧縮等）をお客様のブラウザ（ローカル環境）でのみ実行します。
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#0056b3" }}>2. サーバーへの送信なし (No Server Transmission)</h3>
                            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                                入力されたJSONデータやテキストが、当方のサーバーや第三者のサーバーに送信・保存されることは一切ありません。インターネット接続が切断された状態（オフライン）でも動作することが、その証明です。
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#0056b3" }}>3. ログの不保持 (No Data Logging)</h3>
                            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                                サーバーサイドのデータベースを持たないため、お客様の入力データを保存・閲覧することは技術的に不可能です。
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#0056b3" }}>4. 利用目的</h3>
                            <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                                社内ドキュメント、APIレスポンス、設定ファイルなどの機密情報を含むデータでも、安心してご利用いただけます。
                            </p>
                        </div>
                    </div>
                </section>
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
