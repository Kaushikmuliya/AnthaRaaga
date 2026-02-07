fetch("data/raagas.json")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("raaga-list");

        data.raagas.forEach(raaga => {
            const li = document.createElement("li");
            li.className = "raaga-item";

            li.innerHTML = `
        <a href="raaga.html?id=${raaga.id}" class="raaga-link">
          <span class="raaga-name">
            ${raaga.identity.primary_name}
            ${raaga.identity.alternate_names.length
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
    })
    .catch(err => {
        console.error(err);
        alert("Unable to load raaga list.");
    });
