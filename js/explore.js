document.addEventListener("DOMContentLoaded", () => {
  let allData = [];

  const container = document.getElementById("personalities-container");
  const buttons = document.querySelectorAll("#domain-filter button");

  fetch("data/personalities.json")
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      renderCards(allData);
    })
    .catch((error) => console.error("Error loading personalities:", error));

  function renderCards(data) {
    container.innerHTML = "";
    data.forEach((person) => {
      const card = document.createElement("div");
      card.classList.add("personality-card");

      card.innerHTML = `
        <a href="person.html?id=${person.id}">
          <img src="${person.image}" alt="${person.name}">
          <h3>${person.name}</h3>
          <p>"${person.quote}"</p>
        </a>
      `;
      container.appendChild(card);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector("#domain-filter .active")?.classList.remove("active");
      btn.classList.add("active");

      const domain = btn.getAttribute("data-domain");
      if (domain === "All") {
        renderCards(allData);
      } else {
        const filtered = allData.filter((person) => person.domain === domain);
        renderCards(filtered);
      }
    });
  });
});

