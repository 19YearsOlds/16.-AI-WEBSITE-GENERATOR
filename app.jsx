import React, { useState } from "react";

function App() {
    const [prompt, setPrompt] = useState("");
    const [generatedHTML, setGeneratedHTML] = useState("");

    const generateWebsite = async () => {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        }) ;
        const data = await response.json();
        setGeneratedHTML(data.html);
    };

    return (
      <div>
        <h1>AI Website Generator</h1>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your website..."></textarea>
        <button onClick={generateWebsite}>Generate</button>
        <div dangerouslySetInnerHTML={{ __html: generatedHTML }} />
      </div>
    );
}

export default App;