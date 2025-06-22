let semuaArtikel = []; // Menyimpan semua artikel untuk filter menu

fetch('https://api.rss2json.com/v1/api.json?rss_url=https://kelashukumonline.blogspot.com/feeds/posts/default?alt=rss')
  .then(response => response.json())
  .then(data => {
    semuaArtikel = data.items;

    tampilkanSemuaArtikel(); // fungsi awal menampilkan semua ke masing-masing section

    // Fungsi pencarian
    document.getElementById("searchInput").addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const posts = document.querySelectorAll(".post");
      posts.forEach(post => {
        const title = post.querySelector("h3").textContent.toLowerCase();
        post.style.display = title.includes(keyword) ? "" : "none";
      });
    });

    // Fungsi filter berdasarkan klik menu
    document.querySelectorAll(".menu").forEach(menu => {
      menu.addEventListener("click", function (e) {
        e.preventDefault();
        const kategori = this.getAttribute("data-kategori");
        filterArtikelBerdasarkanKategori(kategori);
      });
    });
  })
  .catch(error => {
    document.querySelector("main").innerHTML = `<p>Gagal memuat artikel. Silakan coba lagi nanti.</p>`;
    console.error("Gagal fetch RSS:", error);
  });

// Fungsi awal untuk tampilkan semua artikel di section masing-masing
function tampilkanSemuaArtikel() {
  semuaArtikel.forEach(item => {
    const title = item.title;
    const link = item.link;
    const date = new Date(item.pubDate).toLocaleDateString("id-ID");
    const description = item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...";
    const categories = item.categories.map(c => c.toLowerCase());

    const articleHTML = `
      <article class="post">
        <h3><a href="${link}" target="_blank">${title}</a></h3>
        <p class="date">Dipublikasikan: ${date}</p>
        <p>${description}</p>
      </article>
    `;

    if (categories.includes("materi hukum perdata")) {
      document.getElementById("perdata-content").innerHTML += articleHTML;
    }
    if (categories.includes("materi hukum pidana")) {
      document.getElementById("pidana-content").innerHTML += articleHTML;
    }
    if (categories.includes("materi hukum internasional")) {
      document.getElementById("internasional-content").innerHTML += articleHTML;
    }
    if (categories.includes("materi hukum tata negara")) {
      document.getElementById("tatnegara-content").innerHTML += articleHTML;
    }
  });
}

// Fungsi filter jika klik menu kategori
function filterArtikelBerdasarkanKategori(kategori) {
  const semuaSection = {
    "materi hukum perdata": "perdata-content",
    "materi hukum pidana": "pidana-content",
    "materi hukum internasional": "internasional-content",
    "materi hukum tata negara": "tatnegara-content"
  };

  // Kosongkan semua section
  Object.values(semuaSection).forEach(id => {
    document.getElementById(id).innerHTML = "";
  });

  // Filter artikel
  semuaArtikel.forEach(item => {
    const title = item.title;
    const link = item.link;
    const date = new Date(item.pubDate).toLocaleDateString("id-ID");
    const description = item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...";
    const categories = item.categories.map(c => c.toLowerCase());

    if (categories.includes(kategori)) {
      const articleHTML = `
        <article class="post">
          <h3><a href="${link}" target="_blank">${title}</a></h3>
          <p class="date">Dipublikasikan: ${date}</p>
          <p>${description}</p>
        </article>
      `;
      document.getElementById(semuaSection[kategori]).innerHTML += articleHTML;
    }
  });

  // Scroll ke bagian yang dipilih
  const sectionId = semuaSection[kategori].replace("-content", "");
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}
