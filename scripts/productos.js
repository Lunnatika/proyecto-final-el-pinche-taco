document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('section-productos');

  if (!contenedor) {
    console.error("No se encontró el contenedor #section-productos");
    return;
  }

  const contenedorTarjetas = document.createElement('div');
  contenedorTarjetas.className = 'productos-container';
  contenedor.appendChild(contenedorTarjetas);

  const carrito = JSON.parse(localStorage.getItem('carrito')) || {};

  fetch('https://raw.githubusercontent.com/Lunnatika/proyecto-final-el-pinche-taco/main/datos/tacos.json')

    .then(res => res.json())
    .then(productos => {
      productos.forEach((producto, index) => {
        if (!(index in carrito)) carrito[index] = 0;

        const card = document.createElement('div');
        card.className = 'producto';
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Producto: ${producto.nombre}, ${producto.descripcion}, precio $${producto.precio}`);

        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p><strong>$${producto.precio}</strong></p>
          <div class="cantidad-control">
            <button class="iconoc" onclick="actualizarCantidad(${index}, -1)" aria-label="Disminuir cantidad del producto">➖</button>
            <span id="cantidad-${index}">0</span>
            <button class="iconoc" onclick="actualizarCantidad(${index}, 1)" aria-label="Aumentar cantidad del producto">➕</button>
          </div>
        `;

        contenedorTarjetas.appendChild(card);
      });

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorTotal();
    })
    .catch(error => {
      console.error("Error al cargar los productos desde la API:", error);
      contenedorTarjetas.innerHTML = "<p>No se pudieron cargar los productos. Intentalo más tarde.</p>";
    });

  window.actualizarCantidad = (index, cambio) => {
    carrito[index] = Math.max(0, (carrito[index] || 0) + cambio);
    document.getElementById(`cantidad-${index}`).textContent = carrito[index];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorTotal();
  };

  function actualizarContadorTotal() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || {};
    const total = Object.values(carritoGuardado).reduce((acc, cantidad) => acc + cantidad, 0);
    const contador = document.getElementById('contador-carrito');
    if (contador) {
      contador.textContent = total;
    }
  }
});
// Aseguramos que el contador se actualice al cargar la página