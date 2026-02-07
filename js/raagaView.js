// Get raaga ID from URL
const params = new URLSearchParams(window.location.search);
const raagaId = params.get("id");

// Basic fallback
if (!raagaId) {
  alert("No raaga specified.");
}

// Fetch raaga data
fetch("data/raagas.json")
  .then(res => res.json())
  .then(data => {
    const raaga = data.raagas.find(r => r.id === raagaId);

    if (!raaga) {
      alert("Raaga not found.");
      return;
    }

    // Identity
    document.getElementById("primary-name").textContent =
      raaga.identity.primary_name;

    document.getElementById("alt-name").textContent =
      raaga.identity.alternate_names.length
        ? `(${raaga.identity.alternate_names.join(", ")})`
        : "";

    // Systems
    const tagContainer = document.getElementById("system-tags");
    raaga.identity.systems.forEach(sys => {
      const tag = document.createElement("span");
      tag.className = `tag ${sys.toLowerCase()}`;
      tag.textContent = sys;
      tagContainer.appendChild(tag);
    });

    // Classification
    document.getElementById("thaat").textContent =
      raaga.classification.hindustani?.thaat || "—";

    document.getElementById("time").textContent =
      raaga.classification.hindustani?.time_of_performance || "—";

    document.getElementById("melakarta").textContent =
      raaga.classification.carnatic
        ? `${raaga.classification.carnatic.melakarta_number} (${raaga.classification.carnatic.melakarta_name})`
        : "—";

    // Structure
    document.getElementById("arohanam").textContent =
      raaga.structure.swaras.arohanam;

    document.getElementById("avarohanam").textContent =
      raaga.structure.swaras.avarohanam;

    document.getElementById("vakra").textContent =
      raaga.structure.vakra ? "Yes" : "No";

    // Aesthetics
    document.getElementById("rasa").textContent =
      raaga.aesthetics.rasa.join(", ");

    document.getElementById("mood").textContent =
      raaga.aesthetics.mood_description;

    // Relationships
    document.getElementById("parent").textContent =
      `${raaga.relationships.parent.hindustani} / ${raaga.relationships.parent.carnatic}`;

    document.getElementById("related").textContent =
      raaga.relationships.related_raagas.join(", ");
  })
  .catch(err => {
    console.error(err);
    alert("Error loading raaga data.");
  });
