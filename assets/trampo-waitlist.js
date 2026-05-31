import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOaTsGz3J0vu6T2ZmNqLLg1hEdVuGFy5k",
  authDomain: "trampoapp2026-e26ba.firebaseapp.com",
  projectId: "trampoapp2026-e26ba",
  storageBucket: "trampoapp2026-e26ba.firebasestorage.app",
  messagingSenderId: "716729329949",
  appId: "1:716729329949:web:d81553008958d1a51a19f4",
  measurementId: "G-6CX3SF5MK8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentStep = 1;
let collectorDocId = localStorage.getItem("trampo_collector_doc_id") || null;
let lastFetchedCep = "";

const steps = document.querySelectorAll(".form-step");
const progress = document.getElementById("form-progress");
const stepLabel = document.getElementById("form-step-label");
const statusLabel = document.getElementById("form-status-label");
const nextBtn = document.getElementById("collectorNextBtn");
const backBtn = document.getElementById("collectorBackBtn");
const messageBox = document.getElementById("collectorFormMessage");

const whatsappInput = document.getElementById("collectorWhatsapp");
const stateInput = document.getElementById("collectorState");
const cityInput = document.getElementById("collectorCity");
const birthDateInput = document.getElementById("collectorBirthDate");
const cepInput = document.getElementById("collectorCep");
const cepHelpText = document.getElementById("cepHelpText");

const BRAZIL_STATES = new Set([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]);

function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    source: params.get("src") || "direct",
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    page_path: window.location.pathname
  };
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeWhatsapp(value) {
  return value.replace(/\D/g, "");
}

function formatWhatsapp(value) {
  const digits = normalizeWhatsapp(value).slice(0, 13);
  const local = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;

  if (local.length <= 2) return local;
  if (local.length <= 7) return `(${local.slice(0, 2)}) ${local.slice(2)}`;
  return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7, 11)}`;
}

function isValidWhatsapp(value) {
  const digits = normalizeWhatsapp(value);
  const local = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;

  if (![10, 11].includes(local.length)) return false;
  if (/^(\d)\1+$/.test(local)) return false;
  if (!/^[1-9]{2}9?\d{8}$/.test(local)) return false;

  return true;
}

function isValidEmail(value) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidCity(value) {
  const city = normalizeWhitespace(value);

  if (city.length < 2) return false;

  return /^[A-Za-zÀ-ÿ\s.'-]+$/.test(city);
}

function normalizeCep(value) {
  return value.replace(/\D/g, "");
}

function formatCep(value) {
  const digits = normalizeCep(value).slice(0, 8);

  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function isValidCep(value) {
  const digits = normalizeCep(value);

  if (digits.length !== 8) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  return true;
}

function setCepHelp(type, text) {
  if (!cepHelpText) return;

  cepHelpText.classList.remove("text-zinc-400", "text-blue-600", "text-emerald-600", "text-red-600");

  if (type === "loading") cepHelpText.classList.add("text-blue-600");
  else if (type === "success") cepHelpText.classList.add("text-emerald-600");
  else if (type === "error") cepHelpText.classList.add("text-red-600");
  else cepHelpText.classList.add("text-zinc-400");

  cepHelpText.textContent = text;
}

async function fetchAddressByCep(cepValue) {
  const cep = normalizeCep(cepValue);

  if (cep.length !== 8) {
    setCepHelp("default", "Digite seu CEP para preencher cidade e estado automaticamente.");
    return;
  }

  if (!isValidCep(cep)) {
    setCepHelp("error", "Digite um CEP válido com 8 números.");
    return;
  }

  if (cep === lastFetchedCep) return;

  lastFetchedCep = cep;
  setCepHelp("loading", "Buscando cidade e estado pelo CEP...");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!response.ok || data.erro) {
      setCepHelp("error", "CEP não encontrado. Confira o número digitado.");
      return;
    }

    if (cityInput) cityInput.value = data.localidade || "";
    if (stateInput) stateInput.value = data.uf || "";

    setCepHelp("success", `Local encontrado: ${data.localidade || ""} - ${data.uf || ""}`);
    clearMessage();
  } catch (error) {
    console.error(error);
    setCepHelp("error", "Não foi possível consultar o CEP agora. Você pode preencher cidade e estado manualmente.");
  }
}

function formatBirthDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function parseBirthDateBR(value) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) return null;

  const birthDate = new Date(year, month - 1, day);

  const isValidDate =
    birthDate.getFullYear() === year &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getDate() === day;

  if (!isValidDate) return null;

  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return {
    birthDate,
    iso,
    display: value
  };
}

function calculateAge(birthDateValue) {
  const parsed = parseBirthDateBR(birthDateValue);
  if (!parsed) return null;

  const birthDate = parsed.birthDate;
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function getSelectedTasks() {
  return Array.from(document.querySelectorAll('input[name="collectorTasks"]:checked')).map(
    (input) => input.value
  );
}

function getChestMountValue() {
  const value = document.getElementById("collectorChestMount").value;

  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "maybe") return "maybe";

  return null;
}

function showMessage(type, text) {
  messageBox.classList.remove(
    "hidden",
    "bg-red-50",
    "text-red-700",
    "bg-emerald-50",
    "text-emerald-700",
    "bg-blue-50",
    "text-blue-700"
  );

  if (type === "error") {
    messageBox.classList.add("bg-red-50", "text-red-700");
  } else if (type === "success") {
    messageBox.classList.add("bg-emerald-50", "text-emerald-700");
  } else {
    messageBox.classList.add("bg-blue-50", "text-blue-700");
  }

  messageBox.textContent = text;
}

function clearMessage() {
  messageBox.classList.add("hidden");
  messageBox.textContent = "";
}

function updateUI() {
  steps.forEach((step) => {
    step.classList.toggle("hidden", Number(step.dataset.step) !== currentStep);
  });

  progress.style.width = `${currentStep * 25}%`;
  stepLabel.textContent = `Etapa ${currentStep} de 4`;

  const labels = {
    1: "Contato inicial",
    2: "Dados básicos",
    3: "Perfil",
    4: "Consentimento"
  };

  statusLabel.textContent = labels[currentStep];
  backBtn.classList.toggle("hidden", currentStep === 1);
  nextBtn.textContent = currentStep === 4 ? "Finalizar cadastro" : "Continuar";
}

function validateStep(step) {
  if (step === 1) {
    const name = normalizeWhitespace(document.getElementById("collectorName").value);
    const whatsapp = document.getElementById("collectorWhatsapp").value;

    if (name.length < 3 || !/[A-Za-zÀ-ÿ]/.test(name)) {
      showMessage("error", "Digite um nome válido para continuar.");
      return false;
    }

    if (!isValidWhatsapp(whatsapp)) {
      showMessage("error", "Digite um WhatsApp válido com DDD. Exemplo: (48) 99999-9999.");
      return false;
    }
  }

  if (step === 2) {
    const email = normalizeWhitespace(document.getElementById("collectorEmail").value).toLowerCase();
    const city = normalizeWhitespace(document.getElementById("collectorCity").value);
    const state = normalizeWhitespace(document.getElementById("collectorState").value).toUpperCase();
    const birthDate = document.getElementById("collectorBirthDate").value;
    const parsedBirthDate = parseBirthDateBR(birthDate);
    const age = calculateAge(birthDate);

    const cepElement = document.getElementById("collectorCep");
    const cep = cepElement ? cepElement.value : "";

    if (!isValidEmail(email)) {
      showMessage("error", "Digite um e-mail válido ou deixe o campo em branco.");
      return false;
    }

    if (!cepElement || !isValidCep(cep)) {
      showMessage("error", "Digite um CEP válido com 8 números. Exemplo: 88000-000.");
      return false;
    }

    if (!isValidCity(city)) {
      showMessage("error", "Digite uma cidade válida.");
      return false;
    }

    if (!BRAZIL_STATES.has(state)) {
      showMessage("error", "Digite um estado válido com 2 letras. Exemplo: SC, SP, RJ.");
      return false;
    }

    if (!parsedBirthDate) {
      showMessage("error", "Digite uma data de nascimento válida no formato DD/MM/AAAA.");
      return false;
    }

    if (age === null || age < 18 || age > 100) {
      showMessage("error", "Você precisa ter 18 anos ou mais para participar do beta.");
      return false;
    }
  }

  if (step === 3) {
    const phoneOS = document.getElementById("collectorPhoneOS").value;
    const phoneModel = normalizeWhitespace(document.getElementById("collectorPhoneModel").value);
    const selectedTasks = getSelectedTasks();
    const chestMount = getChestMountValue();

    if (!phoneOS) {
      showMessage("error", "Selecione se seu celular é Android ou iPhone.");
      return false;
    }

    if (phoneModel.length < 2) {
      showMessage("error", "Digite o modelo do seu celular.");
      return false;
    }

    if (selectedTasks.length === 0) {
      showMessage("error", "Selecione pelo menos uma tarefa que você conseguiria gravar.");
      return false;
    }

    if (chestMount === null) {
      showMessage("error", "Informe se você estaria disposto(a) a gravar com suporte de peito para celular.");
      return false;
    }
  }

  if (step === 4) {
    const requiredChecks = [
      "acceptsContact",
      "understandsApproval",
      "acceptsAIUse",
      "acceptsWaitlist"
    ];

    const allChecked = requiredChecks.every((id) => document.getElementById(id).checked);

    if (!allChecked) {
      showMessage("error", "Você precisa aceitar todos os consentimentos para finalizar.");
      return false;
    }
  }

  clearMessage();
  return true;
}

async function saveStep1() {
  const name = normalizeWhitespace(document.getElementById("collectorName").value);
  const whatsapp = normalizeWhatsapp(document.getElementById("collectorWhatsapp").value);

  const payload = {
    name,
    whatsapp,
    status: "incomplete_step_1",
    formStep: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...getTrackingParams()
  };

  if (!collectorDocId) {
    const docRef = await addDoc(collection(db, "collector_profiles"), payload);
    collectorDocId = docRef.id;
    localStorage.setItem("trampo_collector_doc_id", collectorDocId);
  } else {
    await updateDoc(doc(db, "collector_profiles", collectorDocId), {
      name,
      whatsapp,
      status: "incomplete_step_1",
      formStep: 1,
      updatedAt: serverTimestamp(),
      ...getTrackingParams()
    });
  }
}

async function saveStep2() {
  if (!collectorDocId) return;

  const email = normalizeWhitespace(document.getElementById("collectorEmail").value).toLowerCase() || null;
  const city = normalizeWhitespace(document.getElementById("collectorCity").value);
  const state = normalizeWhitespace(document.getElementById("collectorState").value).toUpperCase();
  const birthDate = document.getElementById("collectorBirthDate").value;
  const parsedBirthDate = parseBirthDateBR(birthDate);
  const age = calculateAge(birthDate);

  const cepElement = document.getElementById("collectorCep");
  const cep = cepElement ? formatCep(cepElement.value) : null;

  await updateDoc(doc(db, "collector_profiles", collectorDocId), {
    email,
    city,
    state,
    cep,
    birthDate,
    birthDateISO: parsedBirthDate ? parsedBirthDate.iso : null,
    age,
    isOver18: age >= 18,
    status: "incomplete_step_2",
    formStep: 2,
    updatedAt: serverTimestamp()
  });
}

async function saveStep3() {
  if (!collectorDocId) return;

  await updateDoc(doc(db, "collector_profiles", collectorDocId), {
    phoneOS: document.getElementById("collectorPhoneOS").value,
    phoneModel: normalizeWhitespace(document.getElementById("collectorPhoneModel").value),
    availableTasks: getSelectedTasks(),
    willingChestMount: getChestMountValue(),
    status: "incomplete_step_3",
    formStep: 3,
    updatedAt: serverTimestamp()
  });
}

async function saveStep4() {
  if (!collectorDocId) return;

  await updateDoc(doc(db, "collector_profiles", collectorDocId), {
    acceptsContact: document.getElementById("acceptsContact").checked,
    understandsRewardApproval: document.getElementById("understandsApproval").checked,
    acceptsAIDataUse: document.getElementById("acceptsAIUse").checked,
    acceptsWaitlist: document.getElementById("acceptsWaitlist").checked,
    status: "completed_waitlist",
    formStep: 4,
    completedAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

if (whatsappInput) {
  whatsappInput.addEventListener("input", (event) => {
    event.target.value = formatWhatsapp(event.target.value);
  });
}

if (stateInput) {
  stateInput.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
  });
}

if (birthDateInput) {
  birthDateInput.addEventListener("input", (event) => {
    event.target.value = formatBirthDate(event.target.value);
  });
}

if (cepInput) {
  cepInput.addEventListener("input", (event) => {
    event.target.value = formatCep(event.target.value);
  });

  cepInput.addEventListener("blur", () => {
    fetchAddressByCep(cepInput.value);
  });

  cepInput.addEventListener("input", () => {
    const cep = normalizeCep(cepInput.value);
    if (cep.length === 8) {
      fetchAddressByCep(cep);
    }
  });
}

nextBtn.addEventListener("click", async () => {
  if (!validateStep(currentStep)) return;

  nextBtn.disabled = true;
  nextBtn.textContent = "Salvando...";

  try {
    if (currentStep === 1) await saveStep1();
    if (currentStep === 2) await saveStep2();
    if (currentStep === 3) await saveStep3();

    if (currentStep === 4) {
      await saveStep4();

      showMessage("success", "Cadastro enviado! Você entrou na lista de espera do beta fechado do Trampo.");
      nextBtn.classList.add("hidden");
      backBtn.classList.add("hidden");
      localStorage.removeItem("trampo_collector_doc_id");
      return;
    }

    currentStep += 1;
    updateUI();
    window.location.hash = "collector-form";
  } catch (error) {
    console.error(error);
    showMessage("error", "Não foi possível salvar agora. Tente novamente em alguns segundos.");
  } finally {
    if (currentStep !== 4 || !nextBtn.classList.contains("hidden")) {
      nextBtn.disabled = false;
      updateUI();
    }
  }
});

backBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep -= 1;
    clearMessage();
    updateUI();
    window.location.hash = "collector-form";
  }
});

updateUI();