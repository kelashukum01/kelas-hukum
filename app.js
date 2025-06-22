const kategoriList = [
  { id: "perdata", label: "materi hukum perdata" },
  { id: "pidana", label: "materi hukum pidana" },
  { id: "internasional", label: "materi hukum internasional" },
  { id: "tatnegara", label: "materi hukum tata negara" }
];

kategoriList.forEach(({ id, label }) => {
  const rssURL = `https://kelashukumonline.blogspot.com/feeds/posts/default/-/${encodeURIComponent(label)}?alt=rss`;
  const apiURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssURL)}`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error("Gagal fetch kategori " + label);
      return response.json();
    })
    .then(data => {
      if (!data.items || data.items.length === 0) {
        document.getElementById(`${id}-content`).innerHTML = `<p>Belum ada artikel pada kategori ini.</p>`;
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

        document.getElementById(`${id}-content`).innerHTML += articleHTML;
      });
    })
    .catch(error => {
      document.getElementById(`${id}-content`).innerHTML = `<p>Gagal memuat artikel materi hukum ${label}</p>`;
      console.error("Gagal memuat kategori", label, error);
    });
});

// Fitur pencarian
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    const title = post.querySelector("h3").textContent.toLowerCase();
    post.style.display = title.includes(keyword) ? "" : "none";
  });
});
