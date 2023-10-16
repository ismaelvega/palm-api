"use client";

import { Suspense, useState } from "react";
import {marked} from 'marked';


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [promptVisibility, setPromptVisibility] = useState(false);
  const [response, setResponse] = useState("");

  async function changeVisibility(state) {
    if(prompt !== ""){
      setResponse(await createMarkup(prompt));
      console.log(prompt);
      setPromptVisibility(state);
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

    return { __html: marked(await getResponse())};
  };

  function Response() {
    return (
      <div>
        <h1>Response</h1>
        <div
          dangerouslySetInnerHTML={response}
          style={{ border: '1px solid #ccc', padding: '10px' }}
        />
      </div>
    );
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
      <button onClick={() => changeVisibility(true)}>Submit</button>
      {promptVisibility && (
        <Suspense fallback={<Loading prompt={prompt} />}>
          <Response />
        </Suspense>
      )}
    </>
  );
}

