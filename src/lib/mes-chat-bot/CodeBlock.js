import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "../styles/CodeBlock.module.css";
import Image from "next/image";

// Create a custom style by overriding the vscDarkPlus theme
const customStyle = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    fontFamily:
      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    fontSize: "14px",
    lineHeight: "1.6",
  },
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "#1E1E1E", // Match VS Code's dark theme background
    padding: "16px",
    borderRadius: "0 0 6px 6px", // Round bottom corners only
    margin: "0",
  },
};

export const Code = ({ node, inline, className, children, ...props }) => {
  const [buttonText, setButtonText] = useState("복사");
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : null;
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setButtonText("복사됨!");
      setTimeout(() => setButtonText("복사"), 2000);
    });
  };

  // For inline code, use the simple `code` tag.
  if (inline || !match) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  // For code blocks, render the full component with header and copy button.
  return (
    <div className={styles.codeBlockContainer}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <button onClick={handleCopy} className={styles.copyButton}>
          <Image src="/file.svg" alt="Copy" width={16} height={16} />
          <span>{buttonText}</span>
        </button>
      </div>
      <SyntaxHighlighter
        style={customStyle}
        language={language}
        PreTag="div"
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
