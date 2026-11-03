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
const sampleProductStats = [
  { name: "Camiseta Canelada", category: "Camisetas", views: 184, sold: 12 },
  { name: "Bermuda Sarja", category: "Bermudas", views: 136, sold: 8 },
  { name: "Bermuda Alfaiataria Marinho", category: "Bermudas", views: 92, sold: 0 },
  { name: "Tênis Slip On", category: "Calçados", views: 76, sold: 3 },
  { name: "Tênis Bege", category: "Calçados", views: 64, sold: 0 }
];
const state = { category: "all", favoritesOnly: false, bag: new Set(), query: "" };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
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

// The management view is a front-end demonstration: its metrics are fabricated examples.
const demoStorageKey = "mrMarcelloPanelDemoProducts";
const panel = $("#panel-app");
const storefront = $("#storefront");
const addDialog = $("#add-product-dialog");
let demoProducts = readDemoProducts();
let toastTimer;

function readDemoProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(demoStorageKey) || "[]");
    return Array.isArray(stored) ? stored.filter((item) => item && typeof item.id === "string" && typeof item.name === "string").slice(0, 40) : [];
  } catch { return []; }
}
function saveDemoProducts() {
  try { localStorage.setItem(demoStorageKey, JSON.stringify(demoProducts)); } catch { /* The preview remains usable in memory. */ }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
}
function demoRows(items, canRemove = false) {
  const examples = items.map((item) => ({ ...item, demo: false }));
  const additions = demoProducts.map((item) => ({ ...item, views: 0, sold: 0, demo: true }));
  const rows = [...examples, ...additions];
  if (!rows.length) return `<tr><td colspan="${canRemove ? 5 : 4}" class="admin-empty">Nenhum produto na demonstração ainda.</td></tr>`;
  return rows.map((item) => `<tr>
    <td><span class="product-cell"><i class="product-row-mark" aria-hidden="true">${item.demo ? "+" : "MR"}</i><span><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.category)}${item.demo ? ` · EXEMPLO ADICIONADO${item.note ? ` · ${escapeHTML(item.note)}` : ""}` : " · REFERÊNCIA DO CATÁLOGO"}</small></span></span></td>
    <td>${item.demo ? "—" : item.views}</td><td>${item.demo ? "—" : item.sold}</td>
    <td><span class="status-tag ${item.demo ? "status-new" : item.sold ? "status-active" : "status-review"}">${item.demo ? "RASCUNHO DE EXEMPLO" : item.sold ? "COM SAÍDA · EXEMPLO" : "SEM SAÍDA · EXEMPLO"}</span></td>
    ${canRemove ? `<td>${item.demo ? `<button type="button" class="remove-demo-product" data-demo-remove="${escapeHTML(item.id)}">REMOVER</button>` : `<span class="table-dash" aria-hidden="true">·</span>`}</td>` : ""}
  </tr>`).join("");
}
function renderDemoPanel() {
  const baseCount = sampleProductStats.length;
  const count = baseCount + demoProducts.length;
  const noSales = sampleProductStats.filter((item) => item.sold === 0).length + demoProducts.length;
  $("#admin-product-count").textContent = String(count).padStart(2, "0");
  $("[data-metric-no-sales]").textContent = String(noSales).padStart(2, "0");
  $("#overview-product-rows").innerHTML = demoRows(sampleProductStats);
  $("#manage-product-rows").innerHTML = demoRows(sampleProductStats, true);
  const maxViews = Math.max(...sampleProductStats.map((item) => item.views));
  $("#interest-chart").innerHTML = sampleProductStats.slice(0, 4).map((item) => `<div class="interest-row"><span>${escapeHTML(item.name)}</span><div class="interest-track"><i style="--bar-width:${Math.round(item.views / maxViews * 100)}%"></i></div><b>${item.views}</b></div>`).join("");
}
function showAdminToast(message) {
  const toast = $("#admin-toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}
function setAdminPage(name) {
  const page = name === "products" ? "products" : "overview";
  $$('[data-panel-page]').forEach((section) => { section.hidden = section.dataset.panelPage !== page; });
  $$('[data-panel-view]').forEach((button) => {
    const active = button.dataset.panelView === page;
    button.classList.toggle("is-active", active);
    active ? button.setAttribute("aria-current", "page") : button.removeAttribute("aria-current");
  });
  $(".admin-skip-link").href = page === "products" ? "#panel-products-title" : "#panel-title";
  if (page === "products") $("#panel-products-title").focus({ preventScroll: true });
}
function openAdminPanel(updateAddress = true) {
  storefront.hidden = true;
  panel.hidden = false;
  document.body.classList.add("is-admin-open");
  renderDemoPanel();
  setAdminPage("overview");
  if (updateAddress) {
    const params = new URLSearchParams(location.search);
    params.set("painel", "1");
    history.replaceState(null, "", `${location.pathname}?${params.toString()}#painel`);
  }
  panel.querySelector(".admin-topbar").focus({ preventScroll: true });
  window.scrollTo(0, 0);
}
function closeAdminPanel() {
  panel.hidden = true;
  storefront.hidden = false;
  document.body.classList.remove("is-admin-open");
  const params = new URLSearchParams(location.search);
  params.delete("painel");
  const query = params.toString();
  history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}#inicio`);
  window.scrollTo(0, 0);
  $("#open-panel").focus({ preventScroll: true });
}

$("#open-panel").addEventListener("click", () => openAdminPanel());
$("#close-panel").addEventListener("click", closeAdminPanel);
$$('[data-panel-view]').forEach((button) => button.addEventListener("click", () => setAdminPage(button.dataset.panelView)));
$$('[data-open-products]').forEach((button) => button.addEventListener("click", () => setAdminPage("products")));
$$('[data-add-product]').forEach((button) => button.addEventListener("click", () => {
  $("#add-product-form").reset();
  addDialog.showModal();
  $("#demo-product-name").focus();
}));
$("#form-close").addEventListener("click", () => addDialog.close());
$("#cancel-add-product").addEventListener("click", () => addDialog.close());
$("#add-product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const category = String(form.get("category") || "").trim();
  const note = String(form.get("note") || "").trim();
  if (!name || !category) return;
  demoProducts.unshift({ id: `demo-${Date.now()}`, name, category, note });
  demoProducts = demoProducts.slice(0, 40);
  saveDemoProducts();
  renderDemoPanel();
  addDialog.close();
  setAdminPage("products");
  showAdminToast(`${name} entrou na demonstração. O produto não foi publicado.`);
});
$("#manage-product-rows").addEventListener("click", (event) => {
  const button = event.target.closest("[data-demo-remove]");
  if (!button) return;
  demoProducts = demoProducts.filter((item) => item.id !== button.dataset.demoRemove);
  saveDemoProducts();
  renderDemoPanel();
  showAdminToast("Produto removido da demonstração.");
});
addDialog.addEventListener("click", (event) => { if (event.target === addDialog) addDialog.close(); });
if (new URLSearchParams(location.search).get("painel") === "1") openAdminPanel(false);
