let allRaagas = [];
let currentFilter = "all";

fetch("data/raagas.json")
  .then(res => res.json())
  .then(data => {
    allRaagas = data.raagas;
    renderList(allRaagas);
  });

const list = document.getElementById("raaga-list");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderList(raagas) {
  list.innerHTML = "";

  if (raagas.length === 0) {
    list.innerHTML = "<p class='muted'>No rāgas found.</p>";
    return;
  }

  raagas.forEach(raaga => {
    const li = document.createElement("li");
    li.className = "raaga-item";

    li.innerHTML = `
      <a href="raaga.html?id=${raaga.id}" class="raaga-link">
        <span class="raaga-name">
          ${raaga.identity.primary_name}
          ${
            raaga.identity.alternate_names.length
              ? `<span class="alt-name">(${raaga.identity.alternate_names.join(", ")})</span>`
              : ""
          }
        </span>
        <span class="raaga-systems">
          ${raaga.identity.systems.join(" · ")}
        </span>
      </a>
    `;

    list.appendChild(li);
  });
}

// Search
searchInput.addEventListener("input", () => {
  applyFilters();
});

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.system;
    applyFilters();
  });
});

function applyFilters() {
  const query = searchInput.value.toLowerCase();

  const filtered = allRaagas.filter(r => {
    const matchesSearch =
      r.identity.primary_name.toLowerCase().includes(query) ||
      r.identity.alternate_names.some(n =>
        n.toLowerCase().includes(query)
      );

    const matchesSystem =
      currentFilter === "all" ||
      r.identity.systems
        .map(s => s.toLowerCase())
        .includes(currentFilter);

    return matchesSearch && matchesSystem;
  });

  renderList(filtered);
}
