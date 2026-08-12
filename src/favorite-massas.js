import tabela from "./data/favorites-massas";

document.addEventListener("DOMContentLoaded", function () {
  const principal = document.querySelector("#collections");
  if (!principal) return;

  const gridContainer = principal.querySelector(".grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";
  const itemsParaMostrar = tabela.slice(0, 4);

  itemsParaMostrar.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "collection-card h-80 relative group cursor-pointer";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-duration", "600");
    card.setAttribute("data-aos-delay", `${index * 100}`);

    card.innerHTML = `
      <img
        src="${item.imagePath}"
        alt="${item.name}" 
        class="w-full h-full object-cover"
        loading="lazy"
      />

      <div class="collection-overlay absolute inset-0"></div>

      <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <div class="transform transition-transform duration-300 ease-out group-hover:-translate-y-2">
          <span class="text-xs uppercase font-semibold tracking-wider text-amber-300 mb-1 block">
            ${item.category}
          </span>
          <h3 class="font-playfair text-xl font-bold mb-1">
            ${item.name}
          </h3>
          <p class="text-xs opacity-80 line-clamp-2 mb-3 leading-relaxed">
            ${item.description}
          </p>
          <div class="flex items-center justify-between">
            <span class="font-playfair text-lg font-bold text-amber-200">
              R$ ${item.price.toFixed(2)}
            </span>
            <a href="public/products.html"
              class="px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500 text-black transition-all duration-300 group-hover:bg-amber-400">
              View Details
            </a>
          </div>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });
});
