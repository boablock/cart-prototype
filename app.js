
const contenedorProductos = document.getElementById('contenedor-productos'); 

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

const cantidad = document.getElementById('cantidad')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito =[];

//localStorage - getItem
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();

    console.log(carrito);
})

//PRIMER PASO, INYECTAR AL HTML
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
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map(prod =>{
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item);
        console.log(carrito);
    }

    actualizarCarrito();    
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod)=> prod.id === prodId) // --> ya tengo el producto, ahora quiero eliminarlo del array

    const indice = carrito.indexOf(item);

    carrito.splice(indice, 1);

    actualizarCarrito(); //--> actualizar carrito tiene un boton con evento onclick='eliminarDelCarrtio(prod.id)

    console.log(carrito);
}

const actualizarCarrito = () => {
    //LOS APPENDS SE VAN ACUMULANDO CON LO QE HABIA ANTES
    contenedorCarrito.innerHTML = "" //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //actualizado

    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
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
        //localStorage - setItem
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    // numero del contador carrito (cantidad de items)      
    contadorCarrito.innerText = carrito.length; 
    // precio total
    precioTotal.innerText = carrito.reduce((acc,prod)=> acc + prod.precio, 0)
}


