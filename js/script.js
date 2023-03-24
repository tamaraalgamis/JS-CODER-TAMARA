let stockProductos = [
    {id: 1, nombre: "Jean Milano", tipo: "Jean", cantidad: 1, desc: "Mix-denim con diseño único", precio: 200, talle: "S/M", img: './img/editorial7.JPG'},
    {id: 2, nombre: "Top Corales", tipo: "Top", cantidad: 1, desc: "Inspirado en los corales", precio: 100, talle: "M/L", img: './img/editorial4.JPG'},
    {id: 3, nombre: "Falda Thais", tipo: "Falda", cantidad: 1, desc: "Exclusivo diseño a mano", precio: 110, talle: "XS/S", img: './img/editorial1.JPG'},
    {id: 4, nombre: "Abrigo Rose", tipo: "Abrigo", cantidad: 1, desc: "Atrevete a vere bien", precio: 170, talle: "M/L", img: './img/editorial8.JPG'},
    {id: 5, nombre: "Casaca Wave", tipo: "Casaca", cantidad: 1, desc: "Casaca de mix-denim con diseño unico", precio: 350, talle: "S", img: './img/editorial2.JPG'},
    {id: 6, nombre: "Top Catalina", tipo: "Top", cantidad: 1, desc: "Producto totalmente hecho a mando", precio: 100, talle: "L/XL", img: './img/falda.JPG'},
    {id: 7, nombre: "Abrigo Ocean", tipo: "Abrigo", cantidad: 1, desc: "Estilo y comodidad excepcional", precio: 170, talle: "S/M", img: './img/chompa5.JPG'},
    {id: 8, nombre: "Jean Florencia", tipo: "Jean", cantidad: 1, desc: "Diseño único inspirado en el mar", precio: 200, talle: "L/XL", img: './img/editorial3.JPG'},
]

const contenedorProductos = document.getElementById('contenedor-productos')
const ContenedorCarrito = document.getElementById('carrito-contenedor')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)
    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito() 
    
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    actualizarCarrito()
    console.log(carrito)
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

localStorage.clear()
