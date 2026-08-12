import tabela from "./data/promotion.js";

function estrelas(nota) {
  let estrela = "";
  const notaMax = 10;
  const fullStars = Math.floor(nota / 2);
  const hasHalf = nota % 2 !== 0;
  const emptyStars = Math.floor((notaMax - nota) / 2);

  for (let i = 0; i < fullStars; i++) {
    estrela += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalf) {
    estrela += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    estrela += '<i class="fa-regular fa-star"></i>';
  }
  return estrela;
}

function desconto(preco, descontoPercent) {
  const valorFinal = Math.ceil(preco * (1 - descontoPercent / 100)) - 0.1;
  return valorFinal.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
  const principal = document.querySelector("#delicious");
  if (!principal) return;

  const gridContainer = principal.querySelector(".grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";
  const itemsParaMostrar = tabela.slice(0, 6);

  itemsParaMostrar.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "product-card group flex flex-col justify-between";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-duration", "600");
    card.setAttribute("data-aos-delay", `${index * 100}`);

    const finalPrice = desconto(item.price, item.desconto);

    card.innerHTML = `
      <div>
        <div class="product-image h-52 relative">
          <img 
            src="${item.imagePath}" 
            alt="${item.name}" 
            class="w-full h-full object-cover" 
            loading="lazy" />
          
          <div class="absolute top-3 right-3 discount-badge">
            -${item.desconto}% OFF
          </div>
          
          <button class="favorite-btn absolute top-3 left-3" aria-label="Favorite item">
            <i class="far fa-heart text-sm text-gray-300"></i>
          </button>
        </div>
        
        <div class="p-5 flex flex-col">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-amber-400 bg-amber-500/10 border border-amber-500/20">
              ${item.category}
            </span>
            <div class="star-rating flex items-center">
              ${estrelas(item.rating)}
            </div>
          </div>
          
          <h3 class="text-lg font-bold font-playfair text-white group-hover:text-amber-400 transition-colors mb-2">
            ${item.name}
          </h3>
          
          <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
            ${item.description || 'Authentic Italian dish crafted with fresh ingredients and traditional techniques.'}
          </p>
        </div>
      </div>
      
      <div class="px-5 pb-5 pt-0 flex items-center justify-between border-t border-amber-900/30 mt-auto pt-4">
        <div class="flex items-baseline gap-2">
          <span class="text-xl font-extrabold text-amber-400 font-playfair">R$ ${finalPrice}</span>
          <del class="text-xs text-gray-500">R$ ${item.price.toFixed(2)}</del>
        </div>
        
        <button class="cart-btn" aria-label="Add to cart" title="Add to Cart">
          <i class="fa-solid fa-plus text-sm"></i>
        </button>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  // Favorite toggle listener
  gridContainer.addEventListener("click", function (e) {
    const favBtn = e.target.closest(".favorite-btn");
    if (favBtn) {
      const icon = favBtn.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.replace("far", "fas");
        icon.classList.add("liked");
      } else {
        icon.classList.replace("fas", "far");
        icon.classList.remove("liked");
      }
    }
  });
});
