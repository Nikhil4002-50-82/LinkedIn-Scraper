(async () => {
  const posts = document.querySelectorAll("div.fie-impression-container");

  const interactions = [];

  posts.forEach((post) => {
    const authorEl = post.querySelector(".update-components-actor__title span[dir='ltr']");
    const contentEl = post.querySelector(".feed-shared-inline-show-more-text span[dir='ltr']");
    const likedButton = post.querySelector("button[aria-pressed='true'] span.artdeco-button__text");

    const author = authorEl?.textContent?.trim();
    const content = contentEl?.textContent?.trim();
    const liked = likedButton?.textContent?.trim() === "Like";

    const profileLink = post.querySelector("a[href*='/in/']")?.href;

    if (liked) {
      interactions.push({
        urn: null,
        postUrl: profileLink || "Unknown",
        author: author || "Unknown",
        content: content || "No content",
        action: "like",
      });
    }
  });

  console.log("[EXT]Sending to backend:", interactions);

  if (interactions.length > 0) {
    const res = await fetch("http://localhost:5000/api/interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interactions }),
    });

    const data = await res.json();
    console.log("[EXT]Server response:", data);
  } else {
    console.log("[EXT]No interactions to send.");
  }
})();
