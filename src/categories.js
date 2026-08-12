import itemsData from './data/categories.js';

document.addEventListener('DOMContentLoaded', function() {
  const gridContainer = document.querySelector("#categories");
  
  if (!gridContainer) {
    return;
  }

  gridContainer.innerHTML = '';

  itemsData.forEach((item, index) => {
    const card = document.createElement("a");
    card.href = `./products.html?category=${encodeURIComponent(item.name)}`;
    card.className = "group relative rounded-2xl overflow-hidden bg-[#161519] border border-amber-900/20 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/40 flex flex-col cursor-pointer";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", `${(index % 4) * 100}`);

    card.innerHTML = `
      <div class="relative h-60 w-full overflow-hidden">
        <img 
          src="${item.imagePath}" 
          alt="${item.name}" 
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#161519] via-black/20 to-transparent"></div>
        <span class="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
          Explore
        </span>
      </div>
      
      <div class="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 class="font-playfair text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 mb-1">
            ${item.name}
          </h3>
          <p class="text-xs text-gray-400 font-light">
            Authentic Italian recipes & hand-selected ingredients
          </p>
        </div>

        <div class="mt-6 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
          <span>View Dishes</span>
          <i class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });
});
