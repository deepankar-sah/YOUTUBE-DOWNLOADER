"use client";

import { useState } from "react";

const Main = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");

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
      {/* Format Options */}
      <div className="mt-4 flex justify-around text-gray-700 dark:text-gray-300">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="format"
            value="mp4"
            checked={format === "mp4"}
            onChange={(e) => setFormat(e.target.value)}
            className="accent-blue-600"
          />
          <span>MP4 (Video)</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="format"
            value="mp3"
            checked={format === "mp3"}
            onChange={(e) => setFormat(e.target.value)}
            className="accent-green-600"
          />
          <span>MP3 (Audio)</span>
        </label>
      </div>

      {/*  Download Button */}
      <button
        onClick={handleDownload}
        disabled={!url}
        className={`mt-6 w-full ${
          url
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-300 cursor-not-allowed"
        } text-white font-semibold py-2 px-4 rounded-lg transition`}
      >
        ⬇️ Download as {format.toUpperCase()}
      </button>
      <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
        We do not store or track any data. Paste → Select → Download!
      </p>
    </div>
  );
};
export default Main;
