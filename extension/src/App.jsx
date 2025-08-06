import { useState } from "react";

function App() {
  const [urls, setUrls] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [commentCount, setCommentCount] = useState("");

  const handleScrapeProfiles = () => {
    const links = urls.split("\n").map((link) => link.trim());
    links.forEach((link, i) => {
      setTimeout(() => {
        chrome.tabs.create({ url: link, active: false });
      }, i * 5000);
    });
  };

  const handleInteractFeed = () => {
    chrome.tabs.create(
      { url: "https://www.linkedin.com/feed/", active: true },
      (tab) => {
        setTimeout(() => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["feedContent.js"],
          });

          chrome.storage.local.set({
            likeCount: parseInt(likeCount),
            commentCount: parseInt(commentCount),
          });
        }, 3000);
      }
    );
  };

  const isFeedButtonEnabled = likeCount !== "" && commentCount !== "";

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
        onClick={handleScrapeProfiles}
        className="mt-2 text-white bg-purple-600 px-4 py-2 rounded-xl text-lg font-semibold w-full"
      >
        Start Scraping Profiles
      </button>

      <hr className="my-4 border-t" />

      <input
        type="number"
        min="0"
        className="w-full mb-2 p-2 border rounded text-lg text-black focus:outline-none"
        placeholder="Like count"
        value={likeCount}
        onChange={(e) => setLikeCount(e.target.value)}
      />
      <input
        type="number"
        min="0"
        className="w-full mb-2 p-2 border rounded text-lg text-black focus:outline-none"
        placeholder="Comment count"
        value={commentCount}
        onChange={(e) => setCommentCount(e.target.value)}
      />
      <button
        onClick={handleInteractFeed}
        className={`text-white px-4 py-2 rounded-xl text-lg font-semibold w-full ${
          isFeedButtonEnabled ? "bg-purple-600" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isFeedButtonEnabled}
      >
        Interact with Feed
      </button>
    </div>
  );
}

export default App;
