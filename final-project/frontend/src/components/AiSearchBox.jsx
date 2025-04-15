import React, { useState } from 'react';

function AiSearchBox() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("⏳ Generating recipe suggestions...");

    try {
      const res = await fetch('http://localhost:3000/get-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: input })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown Error");

      setResponse(data.reply);
    } catch (err) {
      setResponse(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-5">
      <h2 className="text-2xl font-bold mb-2">Smart Healthy Eating Recommendations</h2>
      <input
        className="border p-2 rounded w-80"
        type="text"
        placeholder="Enter ingredients, e.g. chicken, broccoli"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        Get Recipe Suggestions
      </button>

      <pre className="bg-gray-100 mt-4 p-4 rounded whitespace-pre-wrap text-left max-w-2xl mx-auto">
        {loading ? "⏳ Generating..." : response}
      </pre>
    </div>
  );
}

export default AiSearchBox;
