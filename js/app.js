const APP_NOMBRE  = "Alma Tierra";
const APP_VERSION = "1.0.0";
const ANIO        = new Date().getFullYear();

let contadorVisitas = 0;
let usuarioActivo = "Invitado";
let esMovil = window.innerWidth < 768;

function sumar(a, b) { return a + b; }
function multiplicar(a, b) { return a * b; }

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const salida = $("#salida");
if (salida) {
  salida.innerHTML = `Bienvenido ${usuarioActivo} a <strong>${APP_NOMBRE}</strong> (v${APP_VERSION}) - ${ANIO}`;
}

const btnVisitas    = $("#btnVisitas");
const totalVisitas  = $("#totalVisitas");
if (btnVisitas && totalVisitas) {
  contadorVisitas = parseInt(localStorage.getItem("visitas") || "0", 10);
  totalVisitas.textContent = contadorVisitas;

  btnVisitas.addEventListener("click", () => {
    contadorVisitas++;
    localStorage.setItem("visitas", String(contadorVisitas));
    totalVisitas.textContent = contadorVisitas;
  });
}

function mostrarHora() {
  const reloj = $("#reloj");
  if (!reloj) return;
  reloj.textContent = new Date().toLocaleTimeString();
}
setInterval(mostrarHora, 1000);
mostrarHora();

const paginaActual = document.body.dataset.page;
$$("nav a[data-page]").forEach(a => {
  if (a.dataset.page === paginaActual) a.classList.add("activo");
});

const btnRojo  = $("#btnRojo");
const btnVerde = $("#btnVerde");
const btnAzul  = $("#btnAzul");
if (btnRojo)  btnRojo.addEventListener("click",  () => document.body.style.backgroundColor = "red");
if (btnVerde) btnVerde.addEventListener("click", () => document.body.style.backgroundColor = "green");
if (btnAzul)  btnAzul.addEventListener("click",  () => document.body.style.backgroundColor = "blue");

const notaInput   = $("#notaInput");
const btnAgregar  = $("#agregarNota");
const listaNotas  = $("#listaNotas");
const notaError   = $("#notaError");
if (btnAgregar && notaInput && listaNotas) {
  btnAgregar.addEventListener("click", () => {
    const texto = notaInput.value.trim();
    if (notaError) notaError.textContent = "";
    if (!texto) {
      if (notaError) notaError.textContent = "La nota no puede estar vacía";
      return;
    }
    const li = document.createElement("li");
    li.textContent = texto;
    listaNotas.appendChild(li);
    notaInput.value = "";
  });
}

const form = $("#formContacto");
if (form) {
  const nombre  = $("#nombre", form);
  const email   = $("#email", form);
  const mensaje = $("#mensaje", form);
  const formMsg = $("#formMsg", form);

  const showErr = (input, msg) => {
    const prev = input.nextElementSibling;
    if (prev && prev.classList.contains("error")) prev.remove();
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = msg;
    input.insertAdjacentElement("afterend", span);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$(".error", form).forEach(e => e.remove());
    formMsg.textContent = "";
    formMsg.className = "";

    if (!nombre.value.trim()) { showErr(nombre, "El nombre es obligatorio"); ok = false; }
    const emailOk = /^\S+@\S+\.\S+$/.test(email.value.trim());
    if (!emailOk) { showErr(email, "Correo inválido"); ok = false; }
    if (mensaje.value.trim().length < 5) { showErr(mensaje, "El mensaje debe tener al menos 5 caracteres"); ok = false; }

    if (ok) {
      formMsg.textContent = "✅ Formulario enviado con éxito";
      formMsg.className = "success";
      form.reset();
    }
  });
}


const buscador   = $("#buscador");
const servicios  = $$(".servicio");
if (buscador && servicios.length) {
  buscador.addEventListener("input", () => {
    const q = buscador.value.toLowerCase();
    servicios.forEach(s =>
      s.style.display = s.textContent.toLowerCase().includes(q) ? "" : "none"
    );
  });
}

function evaluarNumero(n) {
  if (n > 0) return "Positivo";
  else if (n < 0) return "Negativo";
  else return "Cero";
}

function obtenerDia(numero) {
  switch (numero) {
    case 1: return "Lunes";
    case 2: return "Martes";
    case 3: return "Miércoles";
    case 4: return "Jueves";
    case 5: return "Viernes";
    case 6: return "Sábado";
    case 7: return "Domingo";
    default: return "Número inválido";
  }
}

const perfilEl = $("#perfil");
if (perfilEl) {
  const perfil = { nombre: "Alma Tierra", ciudad: "San Cristobal, Tachira, Venezuela", fundado: ANIO };
  perfilEl.innerHTML = `
    <h3>${perfil.nombre}</h3>
    <p>Ciudad: ${perfil.ciudad}</p>
    <small>Fundado en ${perfil.fundado}</small>
  `;
}

class Util {
  static formatearMoneda(valor, moneda = "COP", locale = "es-CO") {
    return new Intl.NumberFormat(locale, { style: "currency", currency: moneda }).format(valor);
  }
}

$$("td[data-precio]").forEach(td => {
  const valor = parseFloat(td.dataset.precio);
  td.textContent = Util.formatearMoneda(valor);
});










