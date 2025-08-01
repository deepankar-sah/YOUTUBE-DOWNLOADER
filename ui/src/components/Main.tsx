"use client";

import { useEffect, useState } from "react";

const Main = () => {
  // State
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [videoId, setVideoId] = useState<string | null>(null);

  // Handle Download Function
  const handleDownload = () => {
    if (!url) return alert("Please enter a Youtube URL first.");
    console.log("Download started for:", url);
    console.log("Format:", format);
    console.log("Video ID:", videoId);
  };

  // Function to extract video ID from url
  const extractYouTubeVideoId = (link: string): string | null => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regExp);
    return match ? match[1] : null;
  };

  // Update video id when url changes
  useEffect(() => {
    const id = extractYouTubeVideoId(url);
    setVideoId(id);
  }, [url]);

  return (
    <div>
      {/*  URL Input */}
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

      {/*  Thumbnail Preview */}

      {videoId && (
        <div className="mt-6 text-center">
          <p className="text-sm text-white mb-2">Video Preview</p>
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="Youtube Thumbnail"
            className="w-full rounded-xl border border-gray-300 shadow-md"
          />
        </div>
      )}

      {/*  Download Button */}
      <button
        onClick={handleDownload}
        disabled={!url || !videoId}
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
