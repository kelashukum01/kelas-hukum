const kategoriList = [
  { id: "perdata", label: "materi hukum perdata" },
  { id: "pidana", label: "materi hukum pidana" },
  { id: "internasional", label: "materi hukum internasional" },
  { id: "tatnegara", label: "materi hukum tata negara" }
];

// Fetch dan tampilkan artikel per kategori
kategoriList.forEach(({ id, label }) => {
  const rssFeed = `https://kelashukumonline.blogspot.com/feeds/posts/default/-/${encodeURIComponent(label)}?alt=rss`;
  const apiURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeed)}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error("Gagal fetch kategori " + label);
      return response.json();
    })
    .then(data => {
      const container = document.getElementById(`${id}-content`);
      if (!data.items || data.items.length === 0) {
        container.innerHTML = `<p>Belum ada artikel pada kategori ini.</p>`;
        return;
      }

      data.items.forEach(item => {
        const title = item.title;
        const link = item.link;
        const date = new Date(item.pubDate).toLocaleDateString("id-ID");
        const description = item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...";

        const articleHTML = `
          <article class="post">
            <h3><a href="${link}" target="_blank">${title}</a></h3>
            <p class="date">Dipublikasikan: ${date}</p>
            <p>${description}</p>
          </article>
        `;
        container.innerHTML += articleHTML;
      });
    })
    .catch(error => {
      document.getElementById(`${id}-content`).innerHTML = `<p>Gagal memuat artikel untuk kategori ${label}.</p>`;
      console.error("Gagal memuat:", label, error);
    });
});

// 🔍 Fitur Pencarian
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    const title = post.querySelector("h3").textContent.toLowerCase();
    post.style.display = title.includes(keyword) ? "" : "none";
  });
});

// 📂 Filter berdasarkan klik menu kategori
document.querySelectorAll(".menu").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const kategori = this.dataset.kategori.toLowerCase();
    const targetId = this.dataset.target || "";

    // Sembunyikan semua section
    kategoriList.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) section.style.display = "none";
    });

    // Tampilkan hanya section yang dipilih
    const tampil = kategoriList.find(k => k.label === kategori);
    if (tampil) {
      const sectionToShow = document.getElementById(tampil.id);
      if (sectionToShow) sectionToShow.style.display = "block";
      sectionToShow.scrollIntoView({ behavior: "smooth" });
    }
  });
});
