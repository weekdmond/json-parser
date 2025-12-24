"use client";

import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import { formatJson, minifyJson, validateWithSchema } from "../utils/jsonHelpers";
import { toHalfWidth, exportToCSV } from "../utils/japaneseHelpers";
import { Trash2, Copy, Minimize, ShieldCheck, Share2, AlertCircle, FileSpreadsheet, Wand2 } from "lucide-react";
import LZString from "lz-string";
import styles from "../app/page.module.css";

export default function JsonWorkspaceJP() {
    const [input, setInput] = useState("");
    const [schema, setSchema] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"input" | "schema">("input");
    const [copyFeedback, setCopyFeedback] = useState("コピー");

    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            try {
                const decompressed = LZString.decompressFromEncodedURIComponent(hash);
                if (decompressed) {
                    const data = JSON.parse(decompressed);
                    if (data.i) setInput(data.i);
                    if (data.s) setSchema(data.s);
                    if (data.o) setOutput(data.o);
                }
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
    }, []);

    const handleFixFullWidth = () => {
        const fixed = toHalfWidth(input);
        if (fixed !== input) {
            setInput(fixed);
            // Also fix schema if active? No, usually JSON data is the issue.
        }
    };

    const handleFormat = () => {
        setError(null);
        try {
            // Auto-fix full width before processing if Japanese users forget
            const processedInput = toHalfWidth(input);
            if (processedInput !== input) setInput(processedInput);

            if (activeTab === "schema" && schema) {
                setSchema(formatJson(schema));
                return;
            }
            if (!processedInput) return;

            if (schema) {
                const validationError = validateWithSchema(processedInput, schema);
                if (validationError) {
                    setError(validationError);
                    // Continue to format anyway
                }
            }

            const formatted = formatJson(processedInput);
            setOutput(formatted);
        } catch (e) {
            setError((e as Error).message);
        }
    };

    const handleMinify = () => {
        setError(null);
        try {
            const processedInput = toHalfWidth(input);
            const minified = minifyJson(processedInput);
            setOutput(minified);
        } catch (e) {
            setError((e as Error).message);
        }
    };

    const handleClear = () => {
        if (activeTab === "input") setInput("");
        else setSchema("");
        setOutput("");
        setError(null);
        window.history.replaceState(null, "", " ");
    };

    const handleCopy = async () => {
        if (!output) return;
        try {
            await navigator.clipboard.writeText(output);
            setCopyFeedback("コピー完了!");
            setTimeout(() => setCopyFeedback("コピー"), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const handleShare = () => {
        try {
            const state = { i: input, s: schema, o: output };
            const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(state));
            const url = `${window.location.origin}/jp#${compressed}`;
            navigator.clipboard.writeText(url);
            setCopyFeedback("URLコピー完了!");
            setTimeout(() => setCopyFeedback("コピー"), 2000);
        } catch (e) {
            console.error(e);
        }
    };

    const handleExportExcel = () => {
        try {
            if (!output) return;
            const data = JSON.parse(output);
            if (Array.isArray(data)) {
                exportToCSV(data, "data.csv");
            } else {
                // Try to wrap in array or export keys
                exportToCSV([data], "data.csv");
            }
        } catch (e) {
            setError("CSVエクスポートはJSON配列またはオブジェクトが必要です。");
        }
    };

    return (
        <div className={styles.workspace}>
            <div className={styles.pane}>
                <div className={styles.paneHeader}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className={styles.paneTitle}
                            onClick={() => setActiveTab("input")}
                            style={{ opacity: activeTab === "input" ? 1 : 0.6, borderBottom: activeTab === "input" ? '2px solid #28a745' : 'none', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            JSON 入力
                        </button>
                        <button
                            className={styles.paneTitle}
                            onClick={() => setActiveTab("schema")}
                            style={{ opacity: activeTab === "schema" ? 1 : 0.6, borderBottom: activeTab === "schema" ? '2px solid #28a745' : 'none', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            JSON Schema
                        </button>
                    </div>
                    <div className={styles.toolbar}>
                        <button className={styles.button} onClick={handleFixFullWidth} title="全角数字などを半角に修正">
                            <Wand2 size={14} />
                            全角修正
                        </button>
                        <button className={styles.button} onClick={handleClear} title="クリア">
                            <Trash2 size={14} />
                            クリア
                        </button>
                    </div>
                </div>
                <div className={styles.paneContent}>
                    <Editor
                        value={activeTab === "input" ? input : schema}
                        onValueChange={activeTab === "input" ? setInput : setSchema}
                        highlight={(code) => highlight(code, languages.json, "json")}
                        padding={20}
                        className={styles.editor}
                        placeholder={activeTab === "input" ? "JSONを貼り付けてください..." : "JSON Schemaを貼り付けてください..."}
                        style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 13 }}
                    />
                </div>
            </div>

            <div className={styles.pane}>
                <div className={styles.paneHeader}>
                    <span className={styles.paneTitle}>解析結果 / バリデーション</span>
                    <div className={styles.toolbar}>
                        <button className={`${styles.button} ${styles.buttonPrimary}`} style={{ backgroundColor: '#0056b3' }} onClick={handleFormat}>
                            <ShieldCheck size={14} />
                            整形・検証
                        </button>
                        <button className={styles.button} onClick={handleMinify}>
                            <Minimize size={14} />
                            圧縮
                        </button>
                        <button className={styles.button} onClick={handleExportExcel} title="CSVダウンロード">
                            <FileSpreadsheet size={14} />
                            CSV保存
                        </button>
                        <button className={styles.button} onClick={handleCopy}>
                            <Copy size={14} />
                            {copyFeedback}
                        </button>
                        <button className={styles.button} onClick={handleShare}>
                            <Share2 size={14} />
                            共有
                        </button>
                    </div>
                </div>
                <div className={styles.paneContent}>
                    {error ? (
                        <div style={{ color: 'red', padding: '20px', fontFamily: 'monospace' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <AlertCircle size={16} />
                                <strong>エラー:</strong>
                            </div>
                            {error}
                        </div>
                    ) : (
                        <Editor
                            value={output}
                            onValueChange={() => { }}
                            highlight={(code) => highlight(code, languages.json, "json")}
                            padding={20}
                            className={styles.editor}
                            style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 13 }}
                            readOnly
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
