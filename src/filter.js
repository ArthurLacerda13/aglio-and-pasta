import { allProducts } from './data/all-products.js';

function filtrar() {
  const input = document.getElementById('inputBusca');
  const ul = document.getElementById('listaProdutos');

  if (!input || !ul) return;

  const filter = input.value.trim().toUpperCase();
  const liList = ul.getElementsByTagName("li");

  let count = 0;
  for (let i = 0; i < liList.length; i++) {
    const a = liList[i].getElementsByTagName("a")[0];
    const txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      liList[i].style.display = "";
      count++;
    } else {
      liList[i].style.display = "none";
    }
  }

  if (filter === "" || count === 0) {
    ul.style.display = "none";
  } else {
    ul.style.display = "block";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ul = document.getElementById('listaProdutos');
  const input = document.getElementById('inputBusca');

  if (!ul || !input) return;

  ul.innerHTML = '';
  
  allProducts.forEach((item) => {
    const li = document.createElement("li");
    const isPublicFolder = window.location.pathname.includes('/public/');
    const targetUrl = isPublicFolder 
      ? `./products.html?category=${encodeURIComponent(item.category)}`
      : `./public/products.html?category=${encodeURIComponent(item.category)}`;

    li.innerHTML = `
      <a href="${targetUrl}" class="flex items-center space-x-3 w-full px-4 py-2.5 hover:bg-amber-500/10 text-gray-200 hover:text-amber-400 transition-colors duration-200">
        <img class="w-9 h-9 object-cover rounded-lg border border-amber-900/30" src="${item.imagePath}" alt="${item.name}">
        <div class="flex flex-col text-left overflow-hidden">
          <span class="item-name text-xs font-semibold truncate">${item.name}</span>
          <span class="text-[10px] text-gray-500">${item.category} • R$ ${item.price.toFixed(2)}</span>
        </div>
      </a>
    `;
    ul.appendChild(li);
  });

  input.addEventListener('keyup', filtrar);

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !ul.contains(e.target)) {
      ul.style.display = "none";
    }
  });
});