"use client";

import { useState } from "react";

const Main = () => {
  const [url, setUrl] = useState("");

  const handleDownload = () => {
    if (!url) return alert("Please enter a Youtube URL");
    console.log("Download started for:", url);
  };
  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste Youtube Url"
        className="w-full px-4 py-2 rounded-xl border text-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleDownload}
        className="w-full h-10 mt-4 bg-blue-600 rounded-xl "
      >
        Download Video
      </button>
    </div>
  );
};
export default Main;
