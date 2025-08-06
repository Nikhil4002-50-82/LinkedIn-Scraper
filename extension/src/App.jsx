import { useState } from "react";

function App() {
  const [urls, setUrls] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [commentCount, setCommentCount] = useState("");

  const handleClick = () => {
    const links = urls.split("\n").map((link) => link.trim());
    links.forEach((link, i) => {
      setTimeout(() => {
        chrome.tabs.create({ url: link, active: false });
      }, i * 5000);
    });
  };

  const handleStart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab || !tab.id) return;

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (likeCount, commentCount) => {
          window.postMessage(
            {
              type: "START_ACTION",
              likeCount,
              commentCount,
            },
            "*"
          );
        },
        args: [parseInt(likeCount), parseInt(commentCount)],
      });
    });
  };

  const isEnabled = likeCount !== "" && commentCount !== "";

  return (
    <div className="p-4 w-[300px] font-custom">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">LinkedIn Scraper</h2>
      <textarea
        rows="5"
        className="w-full p-2 border rounded text-lg text-black focus:outline-none"
        placeholder="Enter LinkedIn profile URLs (one per line)"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <button
        onClick={handleClick}
        className="mt-4 text-white bg-purple-600 px-4 py-2 rounded-xl text-lg font-semibold w-full"
      >
        Start Scraping
      </button>

      {/* 🚀 New Feature Below */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">Feed Interaction</h3>
        <input
          type="number"
          value={likeCount}
          onChange={(e) => setLikeCount(e.target.value)}
          placeholder="Like Count"
          className="w-full mb-2 p-2 border rounded text-black focus:outline-none"
        />
        <input
          type="number"
          value={commentCount}
          onChange={(e) => setCommentCount(e.target.value)}
          placeholder="Comment Count"
          className="w-full mb-3 p-2 border rounded text-black focus:outline-none"
        />
        <button
          onClick={handleStart}
          disabled={!isEnabled}
          className={`px-4 py-2 w-full rounded-xl text-lg font-semibold ${
            isEnabled
              ? "bg-purple-600 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Start Interaction
        </button>
      </div>
    </div>
  );
}

export default App;
