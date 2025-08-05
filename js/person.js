// Determine which page we're on by checking for specific elements

// === 1. Explore Page ===
/*
if (document.getElementById('personality-container')) {
  fetch('data/personalities.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('personality-container');
      data.forEach(person => {
        const card = document.createElement('div');
        card.className = 'personality-card';

        card.innerHTML = `
        <a href="person.html?id=${person.id}" style="text-decoration: none; color: inherit;">   <img src="${person.image}" alt="${person.name}">
          <h3>${person.name}</h3>
          <p>"${person.quote}"</p></a>
        `;

        card.addEventListener('click', () => {
          window.location.href = `person.html?id=${person.id}`;
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading list of personalities:', err);
      document.getElementById('personality-container').innerHTML = '<p>Error loading personalities.</p>';
    });
}

// === 2. Person Detail Page ===
if (document.getElementById('person-details')) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  

  fetch('data/personalities.json')
    .then(response => response.json())
    .then(data => {
      const person = data.find(p => p.id === id);
      const container = document.getElementById('person-details');

      if (person) {
        container.innerHTML = `
         <h2>${person.name}</h2>
          <img src="${person.image}" alt="${person.name}" class="card-img">
          <p>${person.quote}</p>
          <a href="explore.html">← Back to Explore</a>
        `;
      } else {
        container.innerHTML = '<p>Person not found.</p>';
      }
    })
    .catch(err => {
      console.error('Error loading person details:', err);
      document.getElementById('person-details').innerHTML = '<p>Error loading person details.</p>';
    });
}*/
// person.js
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get("index");

  if (!index) {
    document.body.innerHTML = "<h2>Invalid personality selected</h2>";
    return;
  }

  fetch("data/personalities.json")
    .then((res) => res.json())
    .then((data) => {
      const person = data[index];

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


