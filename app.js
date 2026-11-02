const shopPhone = "5511920502135";
const designs = {
  closet: { title: "Tendência<br>com autenticidade.", text: "Peças versáteis, escolhidas para acompanhar o seu ritmo.", kicker: "MR MARCELLO · MODA MASCULINA", image: "images/look-sarja-1.jpg", alt: "Look MR Marcello com camiseta canelada, bermuda de sarja e tênis slip-on", index: "01 / 03", label:"Essencial" },
  atelier: { title: "Feito para<br>combinar com você.", text: "Uma curadoria casual contemporânea, com atenção a cada detalhe.", kicker: "CASUAL CONTEMPORÂNEO · SÃO PAULO", image: "images/look-marinho.jpg", alt: "Look MR Marcello com camiseta e bermuda de alfaiataria marinho", index: "02 / 03", label:"Ateliê" },
  street: { title: "VISTA<br>SEU PRÓXIMO RITMO.", text: "Conheça os looks da MR Marcello e consulte a equipe sobre as peças.", kicker: "MRM · ESTILO EM MOVIMENTO", image: "images/look-sarja-2.jpg", alt: "Look masculino MR Marcello com camiseta canelada e bermuda de sarja", index: "03 / 03", label:"Rua" }
};
const products = [
  { id: "camiseta-canelada", name: "Camiseta Canelada", category: "tops", image: "images/look-sarja-1.jpg", alt: "Modelo usa camiseta canelada MR Marcello em combinação casual", source: "https://www.instagram.com/mrmarcello_/p/DfKrXdDlLR6/", tag: "NO LOOK" },
  { id: "bermuda-sarja", name: "Bermuda Sarja", category: "bottoms", image: "images/look-sarja-2.jpg", alt: "Bermuda de sarja MR Marcello em look casual com camiseta canelada", source: "https://www.instagram.com/mrmarcello_/p/DfKrXdDlLR6/", tag: "NO LOOK" },
  { id: "tenis-slip-on", name: "Tênis Slip On", category: "shoes", image: "images/look-sarja-1.jpg", alt: "Tênis slip-on compondo look MR Marcello com camiseta e bermuda", source: "https://www.instagram.com/mrmarcello_/p/DfKrXdDlLR6/", tag: "NO LOOK" },
  { id: "bermuda-alfaiataria", name: "Bermuda Alfaiataria Marinho", category: "bottoms", image: "images/look-marinho.jpg", alt: "Look MR Marcello com bermuda de alfaiataria marinho e camiseta", source: "https://www.instagram.com/mrmarcello_/reel/DfH0HmzhBGS/", tag: "NO LOOK" }
];
const state = { category: "all", favoritesOnly: false, bag: new Set(), query: "" };
const $ = (selector) => document.querySelector(selector);
let favorites = new Set();
try { favorites = new Set(JSON.parse(localStorage.getItem("mrMarcelloFavorites") || "[]")); } catch { favorites = new Set(); }

function renderProducts() {
  const query = state.query.trim().toLocaleLowerCase("pt-BR");
  const items = products.filter((p) => (state.category === "all" || p.category === state.category) && (!state.favoritesOnly || favorites.has(p.id)) && (!query || p.name.toLocaleLowerCase("pt-BR").includes(query)));
  $("#result-count").textContent = `${items.length} ${items.length === 1 ? "peça" : "peças"} vistas em publicações da loja`;
  $("#product-grid").innerHTML = items.length ? items.map((p) => `
    <article class="product-card">
      <a class="product-photo" href="${p.source}" target="_blank" rel="noopener noreferrer" aria-label="Ver publicação original da MR Marcello sobre ${p.name}"><img src="${p.image}" alt="${p.alt}" loading="lazy" width="720" height="1280"><span class="photo-source">VER LOOK ↗</span></a>
      <div class="product-meta"><p>${p.tag} · INSTAGRAM</p><h3>${p.name}</h3><span>Consulte tamanhos, disponibilidade e valor.</span><div class="product-actions"><button type="button" data-add="${p.id}" aria-pressed="${state.bag.has(p.id)}">${state.bag.has(p.id) ? "NA SUA LISTA ✓" : "+ CONSULTAR PEÇA"}</button><button class="favorite-button" type="button" data-favorite="${p.id}" aria-label="${favorites.has(p.id) ? "Remover dos" : "Adicionar aos"} favoritos: ${p.name}" aria-pressed="${favorites.has(p.id)}">${favorites.has(p.id) ? "♥ SALVO" : "♡ SALVAR"}</button></div></div>
    </article>`).join("") : `<div class="empty-state"><strong>Nenhuma peça por aqui ainda.</strong><br>Tente outra busca ou veja todas as peças.</div>`;
}
function updateBag() {
  const count = state.bag.size;
  $("#bag-count").textContent = count;
  $("#bag-summary").textContent = count ? [...state.bag].map((id) => products.find((p) => p.id === id)?.name).join(" · ") : "Guarde aqui as peças para perguntar à loja.";
  $("#whatsapp-inquiry").disabled = count === 0;
  $("#bag-status").textContent = count ? `${count} ${count === 1 ? "peça selecionada" : "peças selecionadas"} para consultar` : "Sua lista está vazia";
}
function setDesign(name) {
  const design = designs[name] || designs.closet;
  document.body.dataset.theme = name;
  $("#hero-title").innerHTML = design.title;
  $("#hero-text").textContent = design.text;
  $("#hero-kicker").textContent = design.kicker;
  $("#hero-image").src = design.image;
  $("#hero-image").alt = design.alt;
  document.querySelector(".hero-index").textContent = design.index;
  $("#direction-label").textContent = design.label;
  document.querySelectorAll("[data-concept]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.concept === name)));
  history.replaceState(null, "", `${location.pathname}${location.search}#${name}`);
}
document.querySelectorAll("[data-concept]").forEach((button) => button.addEventListener("click", () => setDesign(button.dataset.concept)));
document.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => {
  state.category = button.dataset.category;
  document.querySelectorAll("[data-category]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
  renderProducts();
}));
$("#search").addEventListener("input", (event) => { state.query = event.target.value; renderProducts(); });
$("#favorites-filter").addEventListener("click", (event) => {
  state.favoritesOnly = !state.favoritesOnly;
  event.currentTarget.setAttribute("aria-pressed", String(state.favoritesOnly));
  renderProducts();
});
$("#product-grid").addEventListener("click", (event) => {
  const fav = event.target.closest("[data-favorite]");
  const add = event.target.closest("[data-add]");
  if (fav) {
    const id = fav.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    try { localStorage.setItem("mrMarcelloFavorites", JSON.stringify([...favorites])); } catch { /* Session still works when storage is unavailable. */ }
    renderProducts();
  }
  if (add) {
    const id = add.dataset.add;
    state.bag.has(id) ? state.bag.delete(id) : state.bag.add(id);
    renderProducts(); updateBag();
  }
});
$("#whatsapp-inquiry").addEventListener("click", () => {
  if (!state.bag.size) return;
  const names = [...state.bag].map((id) => products.find((p) => p.id === id)?.name).filter(Boolean);
  const message = `Olá, MR Marcello! Vi o catálogo conceito e gostaria de consultar estas peças: ${names.join(", ")}. Poderiam confirmar tamanhos disponíveis, disponibilidade e valores atuais?`;
  window.open(`https://wa.me/${shopPhone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
$(".bag-trigger").addEventListener("click", () => $("#sacola").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "end" }));
document.querySelectorAll("[data-accordion]").forEach((button) => button.addEventListener("click", () => {
  const open = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!open));
  button.nextElementSibling.hidden = open;
}));
const initialDesign = location.hash.slice(1);
if (designs[initialDesign]) setDesign(initialDesign);
renderProducts(); updateBag();
