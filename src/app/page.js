"use client";

import { Suspense, useState } from "react";
import axios from "axios";
import { Response } from "./components/Response";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [interactions, setInteractions] = useState([]);

  async function showInteractions() {
    // if the prompt is not empty then add it to the interactions array
    if (prompt !== "") {
      const getResponse = async () => {
        try {
          const response = await axios.post("/api/response", {
            interactions: [
              ...interactions,
              {
                content: `${prompt}`,
              },
            ],
          });
          const data = response.data;
          console.log(data.data); // Log the retrieved object

          return data.data;
        } catch (error) {
          console.error(error);
        }
      };

      let newInteractions = await getResponse();
      console.log(newInteractions);
      setInteractions(newInteractions);

      console.log(interactions);
    }
  }

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
      {interactions.length > 0 &&
        interactions.map((interaction, index) => {
          const isEven = index % 2 === 0;
          const isUser = isEven;
          const isBot = !isEven;

          return (
            <>
              {isUser && (
                <div key={interaction.key}>User: {interaction.content}</div>
              )}
              {isBot && (
                <Response key={interaction.key} prompt={interaction.content} />
              )}
            </>
          );
        })}
    </>
  );
}
