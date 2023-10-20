"use client";
import { marked } from "marked";

export function Response({ prompt }) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: marked(`**PaLM:** ${prompt}`) }}
        style={{ border: "1px solid #ccc", padding: "10px" }}
      />
    </>
  );
}
