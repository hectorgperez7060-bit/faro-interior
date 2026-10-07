const STORAGE_KEY = "faro-interior-prototype-v1";
const defaults = {
  onboarded: false,
  profile: { name: "", moment: "una etapa de búsqueda", intention: "Recuperar claridad para tomar decisiones", spirituality: "opcional" },
  mood: "", pulse: "", actionDone: false, steps: [false, false, false], journal: [],
  memories: ["Tu intención principal", "Cómo preferís ser acompañado/a", "Tu lugar para lo espiritual"]
};

let state = loadState();
let obStep = 1;
let selectedMood = state.mood;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function loadState() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return structuredClone(defaults); }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); render(); }
function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
  window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}
function openDetail(html) { $("#detailContent").innerHTML = html; $("#detailModal").classList.remove("hidden"); }

function go(screen) {
  $$(".screen").forEach(el => el.classList.toggle("active", el.dataset.screen === screen));
  $$(".nav-item").forEach(el => el.classList.toggle("active", el.dataset.go === screen));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  const name = state.profile.name?.trim();
  $("#greeting").textContent = name ? `Buen día, ${name}.` : "Buen día, caminante.";
  $("#intentionDisplay").textContent = state.profile.intention || defaults.profile.intention;
  $("#memoryCount").textContent = `${state.memories.length} ${state.memories.length === 1 ? "recuerdo" : "recuerdos"}`;
  $$("[data-mood]").forEach(el => el.classList.toggle("selected", el.dataset.mood === state.mood));
  $("#pulseText").value = state.pulse || "";
  $("#actionCheck").closest(".action-card").classList.toggle("done", state.actionDone);
  $$("#weeklySteps button").forEach((el, i) => el.classList.toggle("done", Boolean(state.steps[i])));
  $("#stepsCounter").textContent = `${state.steps.filter(Boolean).length}/3`;
  renderJournal(); renderOrientation();
}

function renderOrientation() {
  const title = $("#orientationTitle"), text = $("#orientationText"), action = $("#nextAction");
  const content = {
    "En calma": ["La calma puede ser una base, no una pausa vacía.", "Aprovechá este momento para mirar una decisión sin urgencia ni presión.", "Escribí qué decisión merece una mirada tranquila."],
    "Con energía": ["Hay impulso. Démosle dirección.", "Tu energía vale más cuando se concentra en una sola cosa importante.", "Elegí una acción de 15 minutos y empezala ahora."],
    "Confundido/a": ["No necesitás claridad total para avanzar.", "Separar hechos, miedos y deseos puede bajar el ruido interno.", "Anotá un hecho, un miedo y un deseo sobre este tema."],
    "Con peso": ["Hoy quizá el cuidado venga antes que el empuje.", "Bajar la exigencia también es una forma de avanzar. Elegí lo verdaderamente necesario.", "Quitá una exigencia innecesaria de tu día."]
  };
  if (!state.mood) return;
  const chosen = content[state.mood]; title.textContent = chosen[0]; text.textContent = chosen[1]; action.textContent = chosen[2];
}

function renderJournal() {
  const wrap = $("#journalEntries");
  if (!state.journal.length) { wrap.innerHTML = '<p class="empty">Todavía no escribiste una entrada. Este espacio empieza cuando vos quieras.</p>'; return; }
  wrap.innerHTML = state.journal.map(entry => `<article class="entry"><time>${escapeHtml(entry.date)}</time><p>${escapeHtml(entry.text)}</p></article>`).join("");
}

function escapeHtml(value) { const div = document.createElement("div"); div.textContent = value; return div.innerHTML; }

$$('[data-go]').forEach(button => button.addEventListener("click", () => go(button.dataset.go)));
$$('[data-mood]').forEach(button => button.addEventListener("click", () => {
  selectedMood = button.dataset.mood; $$("[data-mood]").forEach(el => el.classList.toggle("selected", el === button));
}));

$("#savePulse").addEventListener("click", () => {
  if (!selectedMood) return showToast("Elegí primero cómo te sentís");
  state.mood = selectedMood; state.pulse = $("#pulseText").value.trim(); saveState(); showToast("Tu momento quedó registrado");
  $("#orientationCard").scrollIntoView({ behavior: "smooth", block: "center" });
});

$("#actionCheck").addEventListener("click", () => { state.actionDone = !state.actionDone; saveState(); showToast(state.actionDone ? "Paso realizado ✦" : "Paso reabierto"); });
$$('#weeklySteps button').forEach((button, index) => button.addEventListener("click", () => { state.steps[index] = !state.steps[index]; saveState(); }));

$("#chatForm").addEventListener("submit", event => {
  event.preventDefault(); const input = $("#chatInput"); const value = input.value.trim(); if (!value) return;
  const chat = $("#chatList"); chat.insertAdjacentHTML("beforeend", `<div class="message user"><p>${escapeHtml(value)}</p></div>`); input.value = "";
  const replies = [
    "De todo eso, ¿qué parte depende realmente de vos y qué parte estás intentando controlar sin poder hacerlo?",
    "Escucho que hay algo importante detrás de tus palabras. Si no tuvieras que quedar bien con nadie, ¿qué admitirías que querés?",
    "¿Qué costo tiene seguir igual durante tres meses? Y, al mismo tiempo, ¿qué miedo aparece cuando imaginás cambiar?"
  ];
  const reply = replies[chat.querySelectorAll(".user").length % replies.length];
  window.setTimeout(() => { chat.insertAdjacentHTML("beforeend", `<div class="message guide"><span class="message-author">Faro</span><p>${reply}</p></div>`); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }, 420);
});

$("#saveJournal").addEventListener("click", () => {
  const input = $("#journalText"), text = input.value.trim(); if (!text) return showToast("Escribí algo antes de guardar");
  state.journal.unshift({ date: new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date()), text }); input.value = ""; saveState(); showToast("Entrada guardada en este dispositivo");
});

$("#memoryButton").addEventListener("click", () => openDetail(`<span class="kicker">MEMORIA EDITABLE</span><h2>Esto es lo que Faro recuerda.</h2><p>Nada debería quedar oculto. En el producto real podrás editar cada recuerdo y decidir cuándo caduca.</p><div class="memory-list">${state.memories.map((item, i) => `<div class="memory-item"><span>${escapeHtml(item)}<br><small>Confirmado por vos</small></span><button data-forget="${i}">Olvidar</button></div>`).join("")}</div>`));
$("#detailContent").addEventListener("click", event => { if (!event.target.matches("[data-forget]")) return; state.memories.splice(Number(event.target.dataset.forget), 1); saveState(); $("#detailModal").classList.add("hidden"); showToast("Recuerdo eliminado"); });
$("#openMirror").addEventListener("click", () => openDetail('<span class="kicker">ESPEJO SEMANAL</span><h2>Esta semana buscaste claridad.</h2><p>Tu patrón más visible no es la falta de capacidad: es querer sentir certeza antes de moverte. Tus mejores momentos aparecieron cuando redujiste el problema a una sola acción posible.</p><p><strong>Pregunta para la próxima semana:</strong><br>¿Qué podrías probar sin convertirlo en una decisión definitiva?</p>'));
$("#symbolButton").addEventListener("click", () => openDetail('<span class="kicker">SÍMBOLO · LA ESTRELLA</span><h2>Esperanza con dirección.</h2><p>Tomala como una invitación, no como una predicción: ¿qué señal pequeña te mostraría que estás recuperando confianza en tu propio camino?</p><p><strong>Para escribir:</strong><br>“Estoy dispuesto/a a cuidar…”</p>'));
$$('[data-lens]').forEach(button => button.addEventListener("click", () => showToast(`${button.dataset.lens}: disponible en la próxima etapa`)));
$("#closeDetail").addEventListener("click", () => $("#detailModal").classList.add("hidden"));
$("#detailModal").addEventListener("click", event => { if (event.target.id === "detailModal") event.target.classList.add("hidden"); });

function showOnboardingStep() {
  $$(".onboarding-step").forEach(el => el.classList.toggle("active", Number(el.dataset.obStep) === obStep));
  $$(".progress-dots span").forEach((el, i) => el.classList.toggle("active", i + 1 === obStep));
  $("#onboardingNext").textContent = obStep === 3 ? "Entrar a mi espacio" : "Continuar";
}
$$('#spiritualChoice button').forEach(button => button.addEventListener("click", () => { $$('#spiritualChoice button').forEach(el => el.classList.remove("chosen")); button.classList.add("chosen"); }));
$("#onboardingNext").addEventListener("click", () => {
  if (obStep === 1 && !$("#personName").value.trim()) return showToast("Decinos cómo querés que te llamemos");
  if (obStep < 3) { obStep += 1; showOnboardingStep(); return; }
  state.profile = { name: $("#personName").value.trim(), moment: $("#personMoment").value, intention: $("#personIntention").value.trim() || defaults.profile.intention, spirituality: $("#spiritualChoice .chosen").dataset.value };
  state.onboarded = true; saveState(); $("#onboardingModal").classList.add("hidden"); showToast("Bienvenido/a a tu espacio");
});
$("#skipOnboarding").addEventListener("click", () => { state.onboarded = true; state.profile = { ...defaults.profile, name: "Alex" }; saveState(); $("#onboardingModal").classList.add("hidden"); });

$("#todayLabel").textContent = `TU MOMENTO · ${new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" }).format(new Date()).toUpperCase()}`;
if (!state.onboarded) $("#onboardingModal").classList.remove("hidden");
render();
