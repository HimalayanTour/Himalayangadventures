"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useState } from "react";

type ResearchSource = {
  title: string;
  url: string;
};

function formatInline(text: string): ReactNode[] {
  const pattern =
    /(\*\*.*?\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;

  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    const linkMatch = part.match(
      /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/
    );

    if (linkMatch) {
      const [, label, url] = linkMatch;

      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#78e5ca",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            fontWeight: 700,
          }}
        >
          {label}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function isTableLine(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isSeparatorLine(line: string) {
  const cleaned = line
    .replace(/\|/g, "")
    .replace(/:/g, "")
    .replace(/-/g, "")
    .trim();

  return cleaned === "";
}

function parseTableRow(line: string) {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function renderAnswer(text: string) {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (isTableLine(line)) {
      const tableLines: string[] = [];

      while (
        index < lines.length &&
        isTableLine(lines[index])
      ) {
        tableLines.push(lines[index]);
        index += 1;
      }
