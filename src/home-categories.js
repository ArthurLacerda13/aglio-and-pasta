import itemsData from './data/categories.js';

document.addEventListener('DOMContentLoaded', function () {
  const gridContainer = document.querySelector("#home-categories");

  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  const categories = itemsData.slice(0, 6);

  categories.forEach((item, index) => {
    const delay = index * 100;
    gridContainer.innerHTML += `
    <a href="./public/categories.html" class="category-card flex flex-col items-center text-center"
       data-aos="fade-up" data-aos-duration="600" data-aos-delay="${delay}">
      <div class="category-image-wrapper mb-4">
        <img
          src="${item.imagePath}"
          alt="${item.name}"
          loading="lazy"
        />
      </div>
      <span class="text-sm md:text-base font-semibold text-gray-200 group-hover:text-amber-400 transition-colors">${item.name}</span>
    </a>`;
  });
});
