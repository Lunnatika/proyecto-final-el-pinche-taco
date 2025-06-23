// scripts/productos.js

document.addEventListener('DOMContentLoaded', () => {
   console.log("Script cargado correctamente");
    // Lista de productos
  const productos = [
    {
      nombre: "Nachos",
      descripcion: "de maiz con una salsa a elección",
      precio: 2500,
      imagen: "imagenes/nachos.jpg"
    },
    {
      nombre: "Tacos de carnitas",
      descripcion: "carne de cerdo mixta",
      precio: 3000,
      imagen: "imagenes/tacoscarnitas.jpg"
    },
    {
      nombre: "Tacos de barbacoa",
      descripcion: "Carne de cerdo cocida en salsa de barbacoa",
      precio: 3500,
      imagen: "imagenes/tacosbarbacoa.jpg"
    },
    {
      nombre: "tacos de cuerito",
      descripcion: "Sabroso cuero de cerdo cocinado en manteca",
      precio: 3000,
      imagen: "imagenes/tacocuerito.jpeg"
    },
    {
      nombre: "Tacos de pollo",
      descripcion: "Pollo sasonado al mejor estilo Michoacán",
      precio: 3000,
      imagen: "imagenes/tacospollo.jpg"
    },
    {
      nombre: "Guacamole",
      descripcion: "Salsa de palta, con cebolla, cilantro y limon",
      precio: 1000,
      imagen: "imagenes/guacamole.jpg"
    },
    {
      nombre: "Salsa Roja",
      descripcion: "Salsa picante con tomate y chile",
      precio: 1000,
      imagen: "imagenes/salsaroja.jpg"
    },
    {
      nombre: "Salsa Verde",
      descripcion: "Salsa de palta con cebolla ajo y chile",
      precio: 1000,
      imagen: "imagenes/salsaverde.jpg"
    }
  ];

const contenedor = document.getElementById('section-productos');

  if (!contenedor) {
    console.error("No se encontró el contenedor #section-productos");
    return;
  }

  const contenedorTarjetas = document.createElement('div');
  contenedorTarjetas.className = 'productos-container';

  const carrito = {};

  productos.forEach((producto, index) => {
    const card = document.createElement('div');
    card.className = 'producto';

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio}</strong></p>
      <div class="cantidad-control">
        <button class="iconoc" onclick="actualizarCantidad(${index}, -1)">➖</button>
        <span id="cantidad-${index}">0</span>
        <button class="iconoc" onclick="actualizarCantidad(${index}, 1)">➕</button>
      </div>
    `;

    contenedorTarjetas.appendChild(card);
    carrito[index] = 0;
  });

  contenedor.appendChild(contenedorTarjetas);

  window.actualizarCantidad = (index, cambio) => {
    carrito[index] = Math.max(0, carrito[index] + cambio);
    document.getElementById(`cantidad-${index}`).textContent = carrito[index];
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };
});