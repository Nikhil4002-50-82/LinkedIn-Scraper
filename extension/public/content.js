setTimeout(async () => {
  const name = document.querySelector("h1")?.innerText || "";
  const location =
    document.querySelector(".text-body-small.inline.t-black--light.break-words")
      ?.innerText || "";
  const bioLine =
    document.querySelector(".text-body-medium.break-words")?.innerText || "";
  let about = "";
  const aboutSection = [...document.querySelectorAll("section")].find((sec) =>
    sec.innerText.includes("About")
  );
  if (aboutSection) {
    const heading = aboutSection.querySelector("h2")?.innerText || "";
    about = aboutSection.innerText.replace(heading, "").trim();
  }
  const bodyText = document.body.innerText;
  const followerMatch = bodyText.match(/([\d,]+)\s+followers/i);
  const connectionMatch = bodyText.match(/([\d,]+)\+?\s+connections/i);
  const followerCount = followerMatch ? followerMatch[1] : "";
  const connectionCount = connectionMatch ? connectionMatch[1] : "";

  const data = {
    name,
    location,
    about,
    bio: bioLine,
    followerCount,
    connectionCount,
    url: window.location.href,
  };
  console.log("Scraped data:", data);
  await fetch("http://localhost:5000/api/profiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}, 7000);
