
const contenedorProductos = document.getElementById('contenedor-productos'); 
const contenedorCarrito = document.getElementById('carrito-contenedor')

let carrito =[];

stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar btn btn-primary">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {

    agregarAlCarrito(producto.id)
    })

})


const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item);
    actualizarCarrito();    
    console.log(carrito);
}

const actualizarCarrito = () => {

    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
    })
}


