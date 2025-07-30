import { useState } from "react";

function App() {
  const [urls, setUrls] = useState("");

  const handleClick = () => {
    const links = urls.split("\n").map((link) => link.trim());
    links.forEach((link, i) => {
      setTimeout(() => {
        chrome.tabs.create({ url: link, active: false });
      }, i * 5000);
    });
  };

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
    </div>
  );
}

export default App;
