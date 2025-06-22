let semuaArtikel = [];

fetch('https://api.rss2json.com/v1/api.json?rss_url=https://kelashukumonline.blogspot.com/feeds/posts/default?alt=rss')
  .then(response => response.json())
  .then(data => {
    semuaArtikel = data.items;
    tampilkanArtikel("semua");

    // Filter berdasarkan kategori
    document.querySelectorAll(".menu").forEach(menu => {
      menu.addEventListener("click", function (e) {
        e.preventDefault();
        const kategori = this.getAttribute("data-kategori");
        tampilkanArtikel(kategori);
      });
    });

    // Fitur pencarian
    document.getElementById("searchInput").addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const artikelDitampilkan = document.querySelectorAll(".post");
      artikelDitampilkan.forEach(post => {
        const title = post.querySelector("h3").textContent.toLowerCase();
        if (title.includes(keyword)) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }
      });
    });
  });

function tampilkanArtikel(kategori) {
  const container = document.getElementById("artikel-container");
  container.innerHTML = "";

  const hasil = semuaArtikel.filter(item => {
    const labels = item.categories.map(c => c.toLowerCase());
    return kategori === "semua" || labels.includes(kategori.toLowerCase());
  });

  if (hasil.length === 0) {
    container.innerHTML = "<p>Tidak ada artikel untuk kategori ini.</p>";
    return;
  }

  hasil.forEach(item => {
    const title = item.title;
    const link = item.link;
    const date = new Date(item.pubDate).toLocaleDateString("id-ID");
    const description = item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...";

    const html = `
      <article class="post">
        <h3><a href="${link}" target="_blank">${title}</a></h3>
        <p class="date">Dipublikasikan: ${date}</p>
        <p>${description}</p>
      </article>
    `;
    container.innerHTML += html;
  });
}
