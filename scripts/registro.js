document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-registro").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!nombre || !email || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya está registrado
    if (usuarios.some((u) => u.email === email)) {
      alert("Ese email ya está registrado.");
      return;
    }

    // Guardar usuario
    usuarios.push({ nombre, email, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Registro exitoso! Ahora podés iniciar sesión.");
    window.location.href = "login.html";
  });
});
