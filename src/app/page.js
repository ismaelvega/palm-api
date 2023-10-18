"use client";

import { Suspense, useState } from "react";
import { marked } from "marked";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("yoo");
  const [interactions, setInteractions] = useState([]);

  async function showInteractions() {
    // if the prompt is not empty then add it to the interactions array
    if (prompt !== "") {
      setInteractions(
        [{
          content: prompt
        }]
      );

      console.log(interactions)

      // const getResponse = async () => {
      //   try {
      //     const response = await axios.post('/api/response', {
      //       interactions
      //     });
      //     const data = response.data;
      //     console.log(data); // Log the retrieved object
          
      //     return data;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
      
      // setInteractions([
      //   ...interactions,
      //   {
      //     content: await getResponse()
      //   }
      // ]);

      console.log(interactions)
    }
  }

  const createMarkup = async (prompt) => {
    const getResponse = async () => {
      if (prompt.length !== 0) {
        const data = await fetch(`/api/response?prompt=${prompt}`);
        const response = await data.json();
        console.log(response.data);

        return response.data;
      }
    };

    setResponse(await getResponse());

    return { __html: marked(`Palm: ${response}`) };
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
        interactions.length > 0 && interactions.map((interaction, index) => {
          return(
            <>
              <div key={interaction.index}>
                <div key={interaction.index}>{index}: {interaction.content}</div>
              </div>
            </>
          )
          // if (interaction.type === "prompt") {
          //   return <div key={interaction.key}>User: {interaction.prompt}</div>;
          // } else {
          //   return (
          //     <div
          //       key={interaction.key}
          //       dangerouslySetInnerHTML={interaction.response.html}
          //       style={{ border: '1px solid #ccc', padding: '10px' }}
          //     />
          //   );
          // }
      }
      )}
    </>
  );
}
