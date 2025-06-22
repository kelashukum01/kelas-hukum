// Mengambil artikel dari RSS feed Blogspot menggunakan API rss2json
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://kelashukumonline.blogspot.com/feeds/posts/default?alt=rss')
  .then(response => response.json())
  .then(data => {
    let output = "";
    data.items.forEach(item => {
      output += `
        <article class="post">
          <h2><a href="${item.link}" target="_blank" rel="noopener">${item.title}</a></h2>
          <p class="date">Dipublikasikan: ${new Date(item.pubDate).toLocaleDateString('id-ID')}</p>
          <p>${item.description.substring(0, 150)}...</p>
        </article>
      `;
    });
    document.getElementById("content").innerHTML = output;
  })
  .catch(error => {
    document.getElementById("content").innerHTML = `<p>Gagal memuat artikel. Silakan coba lagi nanti.</p>`;
    console.error("Gagal fetch RSS:", error);
  });
