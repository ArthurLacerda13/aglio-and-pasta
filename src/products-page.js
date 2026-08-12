import { allProducts } from './data/all-products.js';

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('products-grid');
  const noProductsMsg = document.getElementById('no-products-msg');
  const catPills = document.querySelectorAll('.cat-pill');
  const sortSelect = document.getElementById('sort-select');
  const searchInput = document.getElementById('menu-search');
  const resetBtn = document.getElementById('reset-filters-btn');

  // Modal elements
  const modal = document.getElementById('product-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalRating = document.getElementById('modal-rating');
  const modalPrice = document.getElementById('modal-price');
  const modalOrderBtn = document.getElementById('modal-order-btn');

  // Toast
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  let activeCategory = 'all';
  let searchQuery = '';
  let activeSort = 'default';

  // Read URL params
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    activeCategory = categoryParam;
    catPills.forEach(pill => {
      if (pill.dataset.cat.toLowerCase() === categoryParam.toLowerCase()) {
        pill.classList.add('active', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'shadow-md');
        pill.classList.remove('bg-white/5', 'text-gray-300');
      } else {
        pill.classList.remove('active', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'shadow-md');
        pill.classList.add('bg-white/5', 'text-gray-300');
      }
    });
  }

  function getStarsHtml(rating) {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += `<i class="fa-solid fa-star text-amber-400"></i>`;
      } else if (i === fullStars && halfStar) {
        starsHtml += `<i class="fa-solid fa-star-half-stroke text-amber-400"></i>`;
      } else {
        starsHtml += `<i class="fa-regular fa-star text-amber-400/40"></i>`;
      }
    }
    return starsHtml;
  }

  function renderProducts() {
    let filtered = allProducts.filter(item => {
      const matchCat = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    // Sorting
    if (activeSort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'rating-desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    gridContainer.innerHTML = '';

    if (filtered.length === 0) {
      gridContainer.classList.add('hidden');
      noProductsMsg.classList.remove('hidden');
      return;
    }

    gridContainer.classList.remove('hidden');
    noProductsMsg.classList.add('hidden');

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = "product-card group bg-[#161519] border border-amber-900/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/40 flex flex-col justify-between";
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', `${(index % 3) * 100}`);

      card.innerHTML = `
        <div>
          <div class="relative h-56 overflow-hidden">
            <img src="${item.imagePath}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <span class="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
              ${item.category}
            </span>
            ${item.desconto ? `
              <span class="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-600 text-white shadow-lg">
                -${item.desconto}% OFF
              </span>
            ` : ''}
          </div>

          <div class="p-6">
            <div class="flex items-center space-x-1 mb-2 text-xs">
              ${getStarsHtml(item.rating)}
              <span class="text-gray-400 text-[10px] ml-1">(${(item.rating / 2).toFixed(1)})</span>
            </div>
            <h3 class="font-playfair text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300 mb-2">
              ${item.name}
            </h3>
            <p class="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
              ${item.description}
            </p>
          </div>
        </div>

        <div class="px-6 pb-6 pt-0 flex items-center justify-between border-t border-amber-900/20 pt-4">
          <div>
            <span class="text-[10px] uppercase text-gray-500 tracking-wider block">Price</span>
            <span class="font-playfair text-xl font-bold text-amber-300">R$ ${item.price.toFixed(2)}</span>
          </div>
          <button data-id="${item.id}" class="view-detail-btn px-4 py-2 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-all duration-300">
            Details & Order
          </button>
        </div>
      `;

      // Event listener for opening detail modal
      card.querySelector('.view-detail-btn').addEventListener('click', () => {
        openModal(item);
      });

      gridContainer.appendChild(card);
    });
  }

  // Category filter handlers
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => {
        p.classList.remove('active', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'shadow-md');
        p.classList.add('bg-white/5', 'text-gray-300');
      });
      pill.classList.add('active', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'shadow-md');
      pill.classList.remove('bg-white/5', 'text-gray-300');

      activeCategory = pill.dataset.cat;
      renderProducts();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sorting handler
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderProducts();
    });
  }

  // Reset filters
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      activeSort = 'default';
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'default';

      catPills.forEach((p, idx) => {
        if (idx === 0) {
          p.classList.add('active', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'shadow-md');
          p.classList.remove('bg-white/5', 'text-gray-300');
        } else {
          p.classList.remove('active', 'bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'text-black', 'shadow-md');
          p.classList.add('bg-white/5', 'text-gray-300');
        }
      });

      renderProducts();
    });
  }

  // Modal logic
  function openModal(item) {
    modalImg.src = item.imagePath;
    modalTitle.textContent = item.name;
    modalCategory.textContent = item.category;
    modalDesc.textContent = item.description;
    modalRating.innerHTML = getStarsHtml(item.rating);
    modalPrice.textContent = `R$ ${item.price.toFixed(2)}`;

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('#modal-content').classList.remove('scale-95');
      modal.querySelector('#modal-content').classList.add('scale-100');
    }, 10);
  }

  function closeModal() {
    modal.querySelector('#modal-content').classList.remove('scale-100');
    modal.querySelector('#modal-content').classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Toast notification logic
  function showToast(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  if (modalOrderBtn) {
    modalOrderBtn.addEventListener('click', () => {
      closeModal();
      showToast(`Added ${modalTitle.textContent} to your table order!`);
    });
  }

  // Initial render
  renderProducts();
});
