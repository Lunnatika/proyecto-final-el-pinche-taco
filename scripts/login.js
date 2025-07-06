document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-login").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find((u) => u.email === email && u.password === password);

   

      if (usuario) {
  localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
  window.location.href = "index.html";// Redirigir al inicio
} 
    else {
      alert("Email o contraseña incorrectos.");
    }
  });
});
