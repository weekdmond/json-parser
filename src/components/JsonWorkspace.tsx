"use client";

import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-coy.css"; // Light theme
import { Copy, Trash2, Minimize, Maximize, CheckCircle, AlertCircle, FileJson, ShieldCheck, Share2, Check } from "lucide-react";
import styles from "../app/page.module.css";
import { formatJson, minifyJson, validateJson, validateWithSchema } from "../utils/jsonHelpers";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export default function JsonWorkspace() {
    const [input, setInput] = useState("");
    const [schema, setSchema] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"json" | "schema">("json");
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Load state from URL on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash.slice(1);
            if (hash) {
                try {
                    const decompressed = decompressFromEncodedURIComponent(hash);
                    if (decompressed) {
                        const state = JSON.parse(decompressed);
                        if (state.input) setInput(state.input);
                        if (state.schema) setSchema(state.schema);
                        if (state.output) setOutput(state.output);
                    }
                } catch (e) {
                    console.error("Failed to load state from URL", e);
                }
            }
        }
    }, []);

    const handleFormat = () => {
        try {
            const formatted = formatJson(input);
            setInput(formatted); // Format input in place

            if (schema) {
                const validationError = validateWithSchema(formatted, schema);
                if (validationError) {
                    setError(`Schema Error: ${validationError}`);
                    return;
                }
            }

            setOutput(formatted);
            setError(null);
        } catch (e) {
            setError("Invalid JSON: Unable to format");
        }
    };

    const handleCompress = () => {
        try {
            const minified = minifyJson(input);
            setOutput(minified);
            setError(null);
        } catch (e) {
            setError("Invalid JSON: Unable to compress");
        }
    };

    const handleClear = () => {
        if (activeTab === "json") {
            setInput("");
        } else {
            setSchema("");
        }
        setOutput("");
        setError(null);
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
        }
    };

    const handleShare = () => {
        const state = {
            input: input || undefined,
            schema: schema || undefined,
            output: output || undefined,
        };
        const compressed = compressToEncodedURIComponent(JSON.stringify(state));
        const url = `${window.location.origin}${window.location.pathname}#${compressed}`;
        setShareUrl(url);
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        if (input && !validateJson(input)) {
            // Optional: real-time syntax check
        } else if (input) {
            setError(null);
        }
    }, [input]);

    return (
        <div className={styles.workspace}>
            {/* Input Pane */}
            <div className={styles.pane}>
                <div className={styles.paneHeader}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button
                            className={styles.paneTitle}
                            style={{
                                opacity: activeTab === "json" ? 1 : 0.6,
                                cursor: "pointer",
                                borderBottom: activeTab === "json" ? "2px solid #4c9ed9" : "none",
                                background: "transparent",
                                border: "none",
                                padding: "0 0 4px 0"
                            }}
                            onClick={() => setActiveTab("json")}
                        >
                            JSON Input
                        </button>
                        <button
                            className={styles.paneTitle}
                            style={{
                                opacity: activeTab === "schema" ? 1 : 0.6,
                                cursor: "pointer",
                                borderBottom: activeTab === "schema" ? "2px solid #4c9ed9" : "none",
                                background: "transparent",
                                border: "none",
                                padding: "0 0 4px 0"
                            }}
                            onClick={() => setActiveTab("schema")}
                        >
                            JSON Schema
                        </button>
                    </div>
                    <div className={styles.toolbar}>
                        <button onClick={handleClear} className={styles.button} title="Clear">
                            <Trash2 size={14} />
                            Clear
                        </button>
                    </div>
                </div>
                <div className={styles.paneContent}>
                    {activeTab === "json" ? (
                        <Editor
                            value={input}
                            onValueChange={(code) => setInput(code)}
                            highlight={(code) => highlight(code, languages.json, "json")}
                            padding={20}
                            className={styles.editor}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 13,
                                lineHeight: 1.5,
                            }}
                            textareaClassName={styles.editorTextarea}
                            placeholder="Paste your JSON here..."
                        />
                    ) : (
                        <Editor
                            value={schema}
                            onValueChange={(code) => setSchema(code)}
                            highlight={(code) => highlight(code, languages.json, "json")}
                            padding={20}
                            className={styles.editor}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 13,
                                lineHeight: 1.5,
                            }}
                            textareaClassName={styles.editorTextarea}
                            placeholder="Paste your JSON Schema here..."
                        />
                    )}
                    {error && (
                        <div className={styles.error}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Output Pane */}
            <div className={styles.pane}>
                <div className={styles.paneHeader}>
                    <span className={styles.paneTitle}>Output / Validation</span>
                    <div className={styles.toolbar}>
                        <button onClick={handleFormat} className={`${styles.button} ${styles.buttonPrimary}`}>
                            <ShieldCheck size={14} />
                            Validate & Format
                        </button>
                        <button onClick={handleCompress} className={styles.button}>
                            <Minimize size={14} />
                            Compress
                        </button>
                        <button onClick={handleCopy} className={styles.button} title="Copy Output">
                            <Copy size={14} />
                            Copy
                        </button>
                        <button onClick={handleShare} className={styles.button} title="Share via URL">
                            {copied ? <Check size={14} /> : <Share2 size={14} />}
                            {copied ? "Copied!" : "Share"}
                        </button>
                    </div>
                </div>
                <div className={styles.paneContent}>
                    <Editor
                        value={output}
                        onValueChange={(code) => setOutput(code)}
                        highlight={(code) => highlight(code, languages.json, "json")}
                        padding={20}
                        className={styles.editor}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 13,
                            lineHeight: 1.5,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
