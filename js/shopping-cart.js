
/*VARIABLES*/
let cart = [];

// Elementos carrito
const cartCount = document.getElementById("cart-count");

// Elementos de pago
const checkoutPanel = document.getElementById("checkout-panel");
const checkoutOverlay = document.getElementById("checkout-overlay");
const checkoutOpen = document.getElementById("cart-button"); // Cambiado id de checkout-open a cart-button
const checkoutClose = document.getElementById("checkout-close");
const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutPay = document.getElementById("checkout-pay");


//Elemento aviso
const toast = document.getElementById("toast");



/*QUITAR €*/

// Convierte texto "3.99€" → 3.99
function getNumber(price) {
  // Eliminamos cualquier caracter que no sea número, punto o coma, y convertimos coma a punto
  const cleanedPrice = price.replace(/[^\d,.]/g, "").replace(",", ".");
  return parseFloat(cleanedPrice);
}

// Muestra mensaje inferior
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}


// Pintar productos del carrito
function renderCart() {
  if (checkoutItems) checkoutItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += getNumber(item.price);

    if (checkoutItems) {
      checkoutItems.innerHTML += `
        <div class="checkout-item">
          <img src="${item.image}">
          <div>${item.name}</div>
          <strong>${item.price}</strong>
        </div>
      `;
    }
  });

  //ACTUALIZA EL CONTADOR DEL PANEL
  const checkoutCountEl = document.getElementById("checkout-count");
  if (checkoutCountEl) {
    let palabra = (cart.length === 1) ? "artículo" : "artículos";
    checkoutCountEl.textContent = cart.length + " " + palabra;
  }


  //ACTUALIZA EL TOTAL
  if (checkoutTotal) {
    checkoutTotal.textContent = "Total: " + total.toFixed(2) + "€";
  }
}


// Actualizar el numerito del carrito
function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}


/*AÑADIR AL CARRITO*/
function addToCart(productCard) {
  const nameEl = productCard.querySelector(".product-name");
  const priceEl = productCard.querySelector("h4");
  const imgEl = productCard.querySelector("img");

  if (!nameEl || !priceEl) return;

  const name = nameEl.textContent;
  const price = priceEl.textContent;
  const image = imgEl ? imgEl.src : "";

  cart.push({ name, price, image });

  updateCartCount();
  renderCart();
  showToast(name + " añadido al carrito");
}

/* EJECUTAR FUNCION AÑADIR"*/
const botones = document.querySelectorAll(".add-to-cart");

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    // Busca la tarjeta del producto donde está el botón
    const tarjeta = boton.closest(".product-card");
    if (tarjeta) {
      addToCart(tarjeta);
    }
  });
});



/*CHECKOUT PANEL*/
if (checkoutOpen) {
  checkoutOpen.addEventListener("click", () => {
    if (cart.length === 0) return showToast("El carrito está vacío");

    checkoutPanel.classList.add("open");
    checkoutOverlay.classList.add("show");
  });
}

if (checkoutClose) checkoutClose.addEventListener("click", closePanel);
if (checkoutOverlay) checkoutOverlay.addEventListener("click", closePanel);

function closePanel() {
  if (checkoutPanel) checkoutPanel.classList.remove("open");
  if (checkoutOverlay) checkoutOverlay.classList.remove("show");
}

// Simular pago
if (checkoutPay) {
  checkoutPay.addEventListener("click", () => {
    if (cart.length === 0) return;
    cart = [];
    updateCartCount();
    renderCart();
    closePanel();
    showToast("Pago realizado con éxito");
  });
}




/*ORDENAR (Opcional, se mantiene por estructura si existen los elementos)*/
const productGrid = document.querySelector(".products-grid");
const sortSelect = document.getElementById("sort-select");

if (productGrid && sortSelect) {
  const ordenOriginal = Array.from(productGrid.children);

  sortSelect.addEventListener("change", () => {
    const opcion = sortSelect.value;

    if (opcion === "relevance") {
      productGrid.innerHTML = "";
      ordenOriginal.forEach(producto => productGrid.appendChild(producto));
      return;
    }

    const productos = Array.from(productGrid.children);

    productos.sort((a, b) => {
      const nombreA = (a.querySelector(".product-name")?.textContent || "").trim();
      const nombreB = (b.querySelector(".product-name")?.textContent || "").trim();

      const precioA = getNumber(a.querySelector("h4")?.textContent || "0");
      const precioB = getNumber(b.querySelector("h4")?.textContent || "0");

      if (opcion === "priceAsc") return precioA - precioB;
      if (opcion === "priceDesc") return precioB - precioA;
      if (opcion === "nameAsc") return nombreA.localeCompare(nombreB);
      if (opcion === "nameDesc") return nombreB.localeCompare(nombreA);
    });

    productGrid.innerHTML = "";
    productos.forEach(producto => productGrid.appendChild(producto));
  });
}


/* INICIALIZACIÓN */
updateCartCount();
renderCart();
renderCart();