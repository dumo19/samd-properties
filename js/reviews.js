fetch('./reviews.json')
  .then(res => res.json())
  .then(reviewData => {
    const container = document.getElementById("review-items");

    reviewData.forEach((review) => {
      const card = document.createElement("div");
      card.className = "review-card";

      card.innerHTML = `
        <div class="review-star-container">
          <i data-lucide="star" style="fill: #0d2b35; stroke: #0d2b35;"></i>
          <i data-lucide="star" style="fill: #0d2b35; stroke: #0d2b35;"></i>
          <i data-lucide="star" style="fill: #0d2b35; stroke: #0d2b35;"></i>
          <i data-lucide="star" style="fill: #0d2b35; stroke: #0d2b35;"></i>
          <i data-lucide="star" style="fill: #0d2b35; stroke: #0d2b35;"></i>
        </div>
        <p class="review-quote">"${review.message}"</p>
        <div class="review-author">
          <span class="review-name">${review.name}</span>
          <span class="review-date">${review.date}</span>
        </div>
      `;

      container.appendChild(card);
    });

    lucide.createIcons();
  });