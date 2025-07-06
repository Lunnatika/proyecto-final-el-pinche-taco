document.addEventListener('DOMContentLoaded', () => {
  // Lista de productos disponibles (debería coincidir con los de productos.js)
  const productos = [
    { nombre: "Nachos", precio: 2500, imagen: "imagenes/nachos.jpg" },
    { nombre: "Tacos de carnitas", precio: 3000, imagen: "imagenes/tacoscarnitas.jpg" },
    { nombre: "Tacos de barbacoa", precio: 3500, imagen: "imagenes/tacosbarbacoa.jpg" },
    { nombre: "Tacos de cuerito", precio: 3000, imagen: "imagenes/tacocuerito.jpeg" },
    { nombre: "Tacos de pollo", precio: 3000, imagen: "imagenes/tacospollo.jpg" },
    { nombre: "Guacamole", precio: 1000, imagen: "imagenes/guacamole.jpg" },
    { nombre: "Salsa Roja", precio: 1000, imagen: "imagenes/salsaroja.jpg" },
    { nombre: "Salsa Verde", precio: 1000, imagen: "imagenes/salsaverde.jpg" }
  ];

  // Obtener el carrito desde localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || {};

  // Obtener elementos del DOM
  const contenedor = document.getElementById('carrito-contenido');
  const totalDiv = document.getElementById('carrito-total');
  const btnConfirmar = document.getElementById('confirmar-compra');
  const btnCarrito = document.getElementById('btn-carrito');

  // Función para renderizar el contenido del carrito en pantalla
  function renderCarrito() {
    contenedor.innerHTML = '';
    let total = 0;
    let hayProductos = false;

    // Iterar sobre los productos del carrito
    Object.entries(carrito).forEach(([index, cantidad]) => {
      const producto = productos[index];
      if (cantidad > 0) {
        hayProductos = true;
        const subtotal = producto.precio * cantidad;
        total += subtotal;

        // Crear elemento visual del producto
        const item = document.createElement('div');
        item.className = 'producto';
        item.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>Precio unitario: $${producto.precio}</p>
          <p>
            Cantidad: 
            <button onclick="actualizarCantidad(${index}, -1)">➖</button>
            <span>${cantidad}</span>
            <button onclick="actualizarCantidad(${index}, 1)">➕</button>
          </p>
          <p><strong>Subtotal: $${subtotal}</strong></p>
          <button onclick="eliminarProducto(${index})" class="boton" style="background-color: crimson; color: white;">Eliminar</button>
        `;

        contenedor.appendChild(item);
      }
    });

    // Mostrar el total y habilitar/deshabilitar botón de compra
    if (hayProductos) {
      totalDiv.textContent = `🧾 Total a pagar: $${total}`;
      btnConfirmar.disabled = false;
      btnConfirmar.style.opacity = 1;
    } else {
      totalDiv.textContent = "🛒 Tu carrito está vacío.";
      btnConfirmar.disabled = true;
      btnConfirmar.style.opacity = 0.5;
    }
  }

  // Función para aumentar o disminuir cantidad
  window.actualizarCantidad = (index, cambio) => {
    carrito[index] = Math.max(0, (carrito[index] || 0) + cambio);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  };

  // Función para eliminar un producto del carrito
  window.eliminarProducto = (index) => {
    delete carrito[index];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  };

  // Botón para volver a la página del menú de productos
  btnCarrito.addEventListener('click', () => {
    window.location.href = "carrito.html";
  });

  // Confirmar la compra: verifica sesión y limpia el carrito
  btnConfirmar.addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (!usuario) {
      alert('Debés iniciar sesión para confirmar la compra.');
      window.location.href = 'login.html';
      return;
    }

    if (Object.values(carrito).some(q => q > 0)) {
      alert(`🎉 ¡Gracias por tu compra, ${usuario.nombre}!`);
      localStorage.removeItem('carrito');
      window.location.href = "index.html";
    } else {
      alert("Tu carrito está vacío.");
    }
  });

  // Ejecutar al cargar la página
  renderCarrito();
});
