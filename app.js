fetch('https://api.rss2json.com/v1/api.json?rss_url=https://kelashukumonline.blogspot.com/feeds/posts/default?alt=rss')
  .then(response => response.json())
  .then(data => {
    data.items.forEach(item => {
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
        document.getElementById("materi hukum perdata-content").innerHTML += articleHTML;
      }
      if (categories.includes("materi hukum pidana")) {
        document.getElementById("materi hukum pidana-content").innerHTML += articleHTML;
      }
      if (categories.includes("materi hukum internasional")) {
        document.getElementById("materi hukum internasional-content").innerHTML += articleHTML;
      }
      if (categories.includes("materi hukum tata negara")) {
        document.getElementById("materi hukum tata negara-content").innerHTML += articleHTML;
      }
    });

    // Fungsi pencarian
    document.getElementById("searchInput").addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const posts = document.querySelectorAll(".post");
      posts.forEach(post => {
        const title = post.querySelector("h3").textContent.toLowerCase();
        if (title.includes(keyword)) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }
      });
    });
  })
  .catch(error => {
    document.querySelector("main").innerHTML = `<p>Gagal memuat artikel. Silakan coba lagi nanti.</p>`;
    console.error("Gagal fetch RSS:", error);
  });
