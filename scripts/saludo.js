document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const saludo = document.getElementById("saludo-usuario");
  const logoutBtn = document.getElementById("logout-btn");

  if (usuario && saludo) {
    saludo.innerHTML = `👋 ¡Bienvenid@ <strong>${usuario.nombre}</strong>!`;
  }

  if (usuario && logoutBtn) {
    logoutBtn.style.display = "inline-block";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "index.html";
    });
  }
});
