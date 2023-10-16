"use client";

import { Suspense, useState } from "react";
import { marked } from "marked";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [interactions, setInteractions] = useState([]);

  async function showInteractions() {
    // if the prompt is not empty then add it to the interactions array
    if (prompt !== "") {
      setInteractions(
        interactions.push({
          type: "prompt",
          prompt,
        })
      );

      setInteractions([
        ...interactions,
        {
          type: "response",
          response: await createMarkup(prompt)
        },
      ]);
    }
  }

  const createMarkup = async (prompt) => {
    const getResponse = async () => {
      if (prompt.length !== 0) {
        const data = await fetch(`/response?prompt=${prompt}`);
        const response = await data.json();
        console.log(response.data);

        return response.data;
      }
    };

    return { __html: marked(`Palm: ${await getResponse()}`) };
  };

  function Loading({ prompt }) {
    console.log(prompt);
    return <h2>🌀 Loading... {prompt}</h2>;
  }
  return (
    <>
      <h1>Home</h1>
      <input
        type="text"
        placeholder="write a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={() => showInteractions()}>Submit</button>
      {
        interactions.length > 0 && interactions.map((interaction) => {
          if (interaction.type === "prompt") {
            return <div key={interaction.key}>User: {interaction.prompt}</div>;
          } else {
            return (
              <div
                key={interaction.key}
                dangerouslySetInnerHTML={interaction.response}
                style={{ border: '1px solid #ccc', padding: '10px' }}
              />
            );
          }
      }
      )}
    </>
  );
}
