// Verifica si el usuario está logueado y ajusta los botones de navegación
document.addEventListener("DOMContentLoaded", () => {
  console.log("Index.js cargado");

  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const saludo = document.getElementById("saludo-usuario");

  if (usuario && saludo) {
    saludo.innerHTML = `
      👋 ¡Bienvenid@ <strong>${usuario.nombre}</strong>!
      <button id="logout-btn">Cerrar sesión</button>
    `;
    console.log("Saludo mostrado");

    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "index.html";
    });
  } else {
    console.log("No se encontró usuario logueado o contenedor");
  }
});

