class stock {
    constructor(producto) {
        this.id = producto.id
        this.nombre = producto.nombre
        this.tipo = producto.tipo
        this.cantidad = producto.cantidad
        this.desc = producto.desc
        this.precio = producto.precio
        this.talle = producto.talle
        this.img = producto.img
    }
}

const stockProductos = [
    new stock({ id: 1, nombre: "Jean Milano", tipo: "Jean", cantidad: 1, desc: "Mix-denim con diseño único", precio: 300, talle: "S", img: './img/editorial7.JPG' }),
    new stock({ id: 2, nombre: "Jean Florencia", tipo: "Jean", cantidad: 1, desc: "Diseño único inspirado en el mar", precio: 300, talle: "L", img: './img/editorial3.JPG' }),
    new stock({ id: 3, nombre: "Top Catalina", tipo: "Top", cantidad: 1, desc: "Producto totalmente hecho a mando", precio: 100, talle: "L", img: './img/falda.JPG' }),
    new stock({ id: 4, nombre: "Top Corales", tipo: "Top", cantidad: 1, desc: "Inspirado en los corales", precio: 100, talle: "S", img: './img/editorial4.JPG' }),
    new stock({ id: 5, nombre: "Falda Thais", tipo: "Falda", cantidad: 1, desc: "Exclusivo diseño a mano", precio: 120, talle: "M", img: './img/editorial1.JPG' }),
    new stock({ id: 6, nombre: "Abrigo Rose", tipo: "Abrigo", cantidad: 1, desc: "Atrevete a vere bien", precio: 170, talle: "L", img: './img/editorial8.JPG' }),
    new stock({ id: 7, nombre: "Abrigo Ocean", tipo: "Abrigo", cantidad: 1, desc: "Estilo y comodidad excepcional", precio: 170, talle: "S", img: './img/chompa5.JPG' }),
    new stock({ id: 8, nombre: "Casaca Wave", tipo: "Casaca", cantidad: 1, desc: "Casaca de mix-denim con diseño unico", precio: 350, talle: "M", img: './img/editorial2.JPG' }),
    new stock({ id: 9, nombre: "Chompa Celestina", tipo: "Chompa", cantidad: 1, desc: "Hermoso diseño en cuello V ", precio: 110, talle: "S", img: './img/product2.jpg' }),
    new stock({ id: 10, nombre: "Tshirt Verdana", tipo: "Tshirt", cantidad: 1, desc: "Tshirt grueso abrigador ", precio: 110, talle: "L", img: './img/product1.jpg' }),
    new stock({ id: 11, nombre: "Camisa Romina", tipo: "Camisa", cantidad: 1, desc: "Ligera y elegante ", precio: 130, talle: "M", img: './img/product3.jpg' }),
    new stock({ id: 12, nombre: "Chompa Vania", tipo: "Chompa", cantidad: 1, desc: "Oversize perfecta para todas", precio: 110, talle: "M", img: './img/product8.jpg' }),
    new stock({ id: 13, nombre: "Chompa Carolina", tipo: "Chompa", cantidad: 1, desc: "La perfección en una preda", precio: 110, talle: "L", img: './img/product6.jpg' }),
    new stock({ id: 14, nombre: "Hoodie Alina", tipo: "Hoodie", cantidad: 1, desc: "Hoodie celeste", precio: 110, talle: "S", img: './img/product5.jpg' }),
    new stock({ id: 15, nombre: "Hoodie Pink", tipo: "Hoodie", cantidad: 1, desc: "Hoodie rosado", precio: 110, talle: "M", img: './img/product7.jpg' }),
    new stock({ id: 16, nombre: "Hoodie Grecia", tipo: "Hoodie", cantidad: 1, desc: "Hoodie gris", precio: 110, talle: "L", img: './img/product4.jpg' }),
]

const contenedorProductos = document.getElementById('contenedor-productos')
const ContenedorCarrito = document.getElementById('carrito-contenedor')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const botonComprar = document.getElementById('comprar-carrito')
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
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

const agregarAlCarrito = (prodId) => {
    const existe = carrito.find(prod => prod.id === prodId);
    if (existe) {
        carrito.forEach(prod => {
            if (prod.id === prodId) {
                prod.cantidad++;
            }
        });
    } else {
        const item = stockProductos.find(prod => prod.id === prodId);
        carrito.push({ ...item, cantidad: 1 });
    }

    actualizarCarrito();
}

stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `;
    contenedorProductos.appendChild(div);

    const btnAgregar = document.getElementById(`agregar${producto.id}`);

    btnAgregar.addEventListener('click', () => {
        Swal.fire({
            title: '¿Estás seguro que deseas añadir este producto al carrito?',
            icon: 'warning',
            position: 'center',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#0074bd',
            cancelButtonColor: '#d7292b',
            confirmButtonText: 'Confirmar',

        }).then((result) => {

            // Si confirma, se agrega el producto al carrito
            if (result.isConfirmed) {
                if (agregarAlCarrito(producto.id)) {
                    if (!sessionStorage.getItem("carrito")) {
                        sessionStorage.setItem("carrito", JSON.stringify([carrito]));

                    } else {
                        let carritoSessionStorage = JSON.parse(sessionStorage.getItem("carrito"));
                        carritoSessionStorage.push(carrito[carrito.length - 1]);
                        sessionStorage.setItem("carrito", JSON.stringify(carritoSessionStorage));
                    }
                }
                Swal.fire({
                    title: 'Añadido',
                    text: 'Su producto ha sido añadido con éxito.',
                    icon: 'success',
                    confirmButtonColor: '#0074bd',
                    confirmButtonText: 'Continuar'
                })

                // Si cancela, no se agrega el producto al carrito
            } else {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'Su producto no ha sido añadido al carrito.',
                    icon: 'error',
                    confirmButtonColor: '#0074bd',
                    confirmButtonText: 'Continuar'
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    })
});


botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () => {
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
        <p>Talla: <span id="talle">${prod.talle}</span></p>
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



const eliminarDelCarrito = (prodId) => {
    return new Promise((resolve, reject) => {
        const item = carrito.find((prod) => prod.id === prodId);
        if (!item) {
            reject("El producto no existe en el carrito.");
            return;
        }
        const indice = carrito.indexOf(item);
        carrito.splice(indice, 1);
        actualizarCarrito();
        console.log(carrito);
        resolve("Producto eliminado del carrito con éxito.");
    });
};
eliminarDelCarrito()
    .then((res) => {
        console.log(res); // "Producto eliminado del carrito con éxito."
    })
    .catch((err) => {;
        console.log(err)
    });

const btnSwalVaciar = document.getElementById('vaciar-carrito');

btnSwalVaciar.onclick = () => {
    Swal.fire({
        title: 'Vaciar la canasta?',
        text: '¿Estás seguro de vaciar la canasta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar',

    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire('', 'Sus productos han sido eliminados con éxito del carrito', 'success')
            carrito.length = 0
            actualizarCarrito()
        }
    })

}

botonComprar.addEventListener('click', () => {
    (async () => {
        // Mostrar mensaje de confirmación de compra
        const confirmacion = await Swal.fire({
            title: 'Confirmación de compra',
            html: `
            <p>Estás a punto de comprar:</p>
            <ul>
            ${carrito.map(producto => `<li>${producto.nombre} x ${producto.cantidad} x ${producto.talle}</li>`)}
            </ul>
            <p>El precio total es de: $${precioTotal.innerText}</p>
            <p>Ingresa tus datos para continuar con la compra:</p>
            <input type="text" placeholder="Nombre completo" id="nombre" class="swal2-input">
            <input type="email" placeholder="Correo electrónico" id="correo" class="swal2-input">
            <input type="tel" placeholder="Número de teléfono" id="telefono" class="swal2-input">
            <input type="text" placeholder="Dirección de envío" id="direccion" class="swal2-input">
        `,
            showCancelButton: true,
            confirmButtonText: 'Confirmar compra',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = Swal.getPopup().querySelector('#nombre').value;
                const correo = Swal.getPopup().querySelector('#correo').value;
                const telefono = Swal.getPopup().querySelector('#telefono').value;
                const direccion = Swal.getPopup().querySelector('#direccion').value;
                if (!nombre || !correo || !telefono || !direccion) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    
                }
                return {nombre, correo, telefono, direccion };
            }
        });

        // Si se confirmó la compra, mostrar mensaje de éxito
        if (confirmacion.isConfirmed) {
            const { correo, telefono, direccion } = confirmacion.value;
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por tu compra!',
                html: `
            <p>Hemos recibido tu pedido:</p>
            <ul>
                ${carrito.map(producto => `<li>${producto.nombre} x ${producto.cantidad} x ${producto.talle} </li>`)}
            </ul>
            <p>El precio total es de: $${precioTotal.innerText}</p>
            <p>Te enviaremos un correo a ${correo} para confirmar tu pedido.</p>
            <p>Envío a: ${direccion}</p>
            <p>Te contactaremos al número ${telefono} para coordinar la entrega.</p>
            `
            });

            // Limpiar carrito y actualizar DOM
            carrito.length = 0;
            actualizarCarrito();
            localStorage.clear();
        }
    })();
});

localStorage.clear()