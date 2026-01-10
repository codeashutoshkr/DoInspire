// person.js

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    document.body.innerHTML = "<h2>Invalid personality selected</h2>";
    return;
  }

  fetch("data/personalities.json")
    .then((res) => res.json())
    .then((data) => {
     const person = data.find(p => p.id === id);

      if (!person) {
        document.body.innerHTML = "<h2>Personality not found</h2>";
        return;
      }

      document.getElementById("person-image").src = person.image;
      document.getElementById("person-name").textContent = person.name;
      document.getElementById("life-span").textContent = person.life;
      document.getElementById("person-quote").textContent = `"${person.quote}"`;
      document.getElementById("person-bio").textContent = person.bio;
      document.getElementById("books").textContent = person.book;

      const videoContainer = document.getElementById("person-videos");
      person.videos.forEach((link) => {
        const iframe = document.createElement("iframe");
        iframe.src = link;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.className = "video-frame";
        videoContainer.appendChild(iframe);
      });
    })
    .catch((error) => console.error("Error loading personality:", error));
});


