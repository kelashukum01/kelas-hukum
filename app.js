// Daftar label dan ID kontainernya
const kategoriFeeds = {
  "materi hukum perdata": "materi hukum perdata-content",
  "materi hukum pidana": "materi hukum pidana-content",
  "materi hukum internasional": "materi hukum internasional-content",
  "materi hukum tata negara": "materi hukum tata negara-content"
};

// Ambil artikel dari tiap label dan tampilkan
Object.entries(kategoriFeeds).forEach(([label, containerId]) => {
  const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://kelashukumonline.blogspot.com/feeds/posts/default/-/${encodeURIComponent(label)}?alt=rss`;

  fetch(rssUrl)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById(containerId);
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
      document.getElementById(containerId).innerHTML = `<p>Gagal memuat artikel ${label}</p>`;
      console.error(`Gagal memuat kategori ${label}:`, error);
    });
});

// Fungsi pencarian
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    const title = post.querySelector("h3").textContent.toLowerCase();
    post.style.display = title.includes(keyword) ? "" : "none";
  });
});
