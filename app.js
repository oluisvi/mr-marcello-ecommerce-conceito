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
  { id: "sample-camiseta-canelada", name: "Camiseta Canelada", category: "Camisetas", views: 184, sold: 12, image: "images/look-sarja-1.jpg", note: "" },
  { id: "sample-bermuda-sarja", name: "Bermuda Sarja", category: "Bermudas", views: 136, sold: 8, image: "images/look-sarja-2.jpg", note: "" },
  { id: "sample-bermuda-alfaiataria", name: "Bermuda Alfaiataria Marinho", category: "Bermudas", views: 92, sold: 0, image: "images/look-marinho.jpg", note: "" },
  { id: "sample-tenis-slip-on", name: "Tênis Slip On", category: "Calçados", views: 76, sold: 3, image: "images/look-sarja-1.jpg", note: "" },
  { id: "sample-tenis-bege", name: "Tênis Bege", category: "Calçados", views: 64, sold: 0, image: "images/look-marinho.jpg", note: "" }
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
    const validItems = (items) => items.filter((item) => item && typeof item.id === "string" && typeof item.name === "string").map((item) => ({
      ...item,
      name: String(item.name).slice(0, 60),
      category: String(item.category || "Outros").slice(0, 30),
      note: String(item.note || "").slice(0, 160),
      views: Number.isFinite(Number(item.views)) ? Math.max(0, Number(item.views)) : 0,
      sold: Number.isFinite(Number(item.sold)) ? Math.max(0, Number(item.sold)) : 0,
      image: ["images/look-sarja-1.jpg", "images/look-sarja-2.jpg", "images/look-marinho.jpg"].includes(item.image) ? item.image : "",
      demo: Boolean(item.demo)
    })).slice(0, 40);
    if (stored && !Array.isArray(stored) && stored.version === 1 && Array.isArray(stored.products)) return validItems(stored.products);
    if (Array.isArray(stored) && stored.length) {
      const legacy = validItems(stored).map((item) => ({ ...item, demo: true }));
      return [...sampleProductStats.map((item) => ({ ...item, demo: false })), ...legacy].slice(0, 40);
    }
    return sampleProductStats.map((item) => ({ ...item, demo: false }));
  } catch { return sampleProductStats.map((item) => ({ ...item, demo: false })); }
}
function saveDemoProducts() {
  try { localStorage.setItem(demoStorageKey, JSON.stringify({ version: 1, products: demoProducts })); } catch { /* The preview remains usable in memory. */ }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
}
function demoRows(rows = demoProducts, canManage = false) {
  if (!rows.length) return `<tr><td colspan="${canManage ? 5 : 4}" class="admin-empty">Nenhuma peça na simulação. Adicione um produto para começar.</td></tr>`;
  return rows.map((item) => `<tr>
    <td><span class="product-cell"><i class="product-row-mark" aria-hidden="true">${item.demo ? "+" : "MR"}</i><span><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.category)}${item.demo ? ` · ADICIONADO NA SIMULAÇÃO${item.note ? ` · ${escapeHTML(item.note)}` : ""}` : " · REFERÊNCIA DO CATÁLOGO"}</small></span></span></td>
    <td>${item.demo ? "—" : item.views}</td><td>${item.demo ? "—" : item.sold}</td>
    <td><span class="status-tag ${item.demo ? "status-new" : item.sold ? "status-active" : "status-review"}">${item.demo ? "NOVO · SEM DADOS" : item.sold ? "COM SAÍDA · EXEMPLO" : "SEM SAÍDA · EXEMPLO"}</span></td>
    ${canManage ? `<td><div class="table-actions"><button type="button" class="edit-demo-product" data-demo-edit="${escapeHTML(item.id)}">EDITAR</button><button type="button" class="remove-demo-product" data-demo-remove="${escapeHTML(item.id)}">REMOVER</button></div></td>` : ""}
  </tr>`).join("");
}
function renderDemoPanel() {
  const count = demoProducts.length;
  const noSales = demoProducts.filter((item) => item.sold === 0).length;
  const views = demoProducts.reduce((total, item) => total + item.views, 0);
  const sold = demoProducts.reduce((total, item) => total + item.sold, 0);
  $("#admin-product-count").textContent = String(count).padStart(2, "0");
  $("[data-metric-no-sales]").textContent = String(noSales).padStart(2, "0");
  $("[data-metric-views]").textContent = String(views);
  $("[data-metric-sold]").textContent = String(sold);
  $("#overview-product-rows").innerHTML = demoRows(demoProducts);
  $("#manage-product-rows").innerHTML = demoRows(demoProducts, true);
  const ranked = [...demoProducts].sort((a, b) => b.views - a.views);
  const top = ranked[0];
  if (top) {
    $("#highlight-product-name").textContent = top.name;
    $("#highlight-product-views").textContent = String(top.views);
    const image = $("#highlight-product-image");
    image.hidden = !top.image;
    image.src = top.image || "";
    image.alt = top.image ? `Imagem de referência da peça ${top.name}` : "";
    $("#highlight-product-fallback").hidden = Boolean(top.image);
  } else {
    $("#highlight-product-name").textContent = "Sem peças na lista";
    $("#highlight-product-views").textContent = "0";
    $("#highlight-product-image").hidden = true;
    $("#highlight-product-fallback").hidden = false;
  }
  const chartItems = ranked.filter((item) => item.views > 0).slice(0, 4);
  const maxViews = chartItems[0]?.views || 0;
  $("#interest-chart").innerHTML = chartItems.length ? chartItems.map((item) => `<div class="interest-row"><span>${escapeHTML(item.name)}</span><div class="interest-track"><i style="--bar-width:${Math.round(item.views / maxViews * 100)}%"></i></div><b>${item.views}</b></div>`).join("") : `<p class="chart-empty">Adicione visualizações aos dados de exemplo para comparar as peças.</p>`;
}
function showAdminToast(message) {
  const toast = $("#admin-toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}
function openProductForm(productId = "") {
  const form = $("#add-product-form");
  form.reset();
  const item = productId ? demoProducts.find((product) => product.id === productId) : null;
  $("#demo-product-id").value = item?.id || "";
  $("#add-product-title").textContent = item ? "Editar uma peça." : "Adicionar uma peça.";
  $("#product-form-intro").textContent = item
    ? "Altere os detalhes deste exemplo. A mudança fica só neste navegador."
    : "Este cadastro de exemplo fica salvo só neste navegador.";
  $("#product-form-submit").textContent = item ? "SALVAR ALTERAÇÕES ↗" : "ADICIONAR À DEMONSTRAÇÃO ↗";
  if (item) {
    $("#demo-product-name").value = item.name;
    $("#demo-product-category").value = item.category;
    $("#demo-product-note").value = item.note || "";
  }
  addDialog.showModal();
  $("#demo-product-name").focus();
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
$$('[data-add-product]').forEach((button) => button.addEventListener("click", () => openProductForm()));
$("#form-close").addEventListener("click", () => addDialog.close());
$("#cancel-add-product").addEventListener("click", () => addDialog.close());
$("#add-product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const category = String(form.get("category") || "").trim();
  const note = String(form.get("note") || "").trim();
  if (!name || !category) return;
  const editingId = String(form.get("id") || "");
  if (editingId) {
    const existing = demoProducts.find((item) => item.id === editingId);
    if (!existing) return;
    demoProducts = demoProducts.map((item) => item.id === editingId ? { ...item, name, category, note } : item);
  } else {
    demoProducts.unshift({ id: `demo-${Date.now()}`, name, category, note, views: 0, sold: 0, image: "", demo: true });
  }
  demoProducts = demoProducts.slice(0, 40);
  saveDemoProducts();
  renderDemoPanel();
  addDialog.close();
  setAdminPage("products");
  showAdminToast(editingId ? `${name} foi atualizado na demonstração.` : `${name} entrou na demonstração. O produto não foi publicado.`);
});
$("#manage-product-rows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-demo-edit]");
  if (editButton) { openProductForm(editButton.dataset.demoEdit); return; }
  const removeButton = event.target.closest("[data-demo-remove]");
  if (!removeButton) return;
  const item = demoProducts.find((product) => product.id === removeButton.dataset.demoRemove);
  if (!item || !window.confirm(`Remover ${item.name} desta simulação?`)) return;
  demoProducts = demoProducts.filter((product) => product.id !== item.id);
  saveDemoProducts();
  renderDemoPanel();
  showAdminToast(`${item.name} foi removido da demonstração.`);
});
addDialog.addEventListener("click", (event) => { if (event.target === addDialog) addDialog.close(); });
if (new URLSearchParams(location.search).get("painel") === "1") openAdminPanel(false);
