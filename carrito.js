let productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'));

const btnCleanCartHTML = document.querySelector("#btnCleanCart")
const btnConfirmCartHTML = document.querySelector("#btnConfirmCart")
const totalHTML = document.querySelector("#total")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

console.log(productosEnCarrito)

const carritohtml = document.querySelector (".contenedorCarrito")

function cargarProductosCarrito(array) {
    if(array.length > 0) {
        carritohtml.innerHTML = "";
            array.forEach (producto => {
                carritohtml.innerHTML += `
                    <div class="cart-card">
                        <div class="cart-card-info">
                            <h2>${producto.title}</h2>
                            <p>Unit Price: $${producto.price}</p>
                            <p>Units: ${producto.cantidad}</p>
                        </div>
                        <div class="cart-cards-btns-container">
                            <div >
                                <p>${producto.category}</p>
                            </div>
                            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                    `
        });

        actualizarBotonesEliminar();

    } else{
        carritohtml.innerHTML = "";
        carritohtml.innerHTML += `
        <p id="carrito-vacio" class="carrito-vacio">Tu carrito está vacío. <i class="bi bi-emoji-frown"></i></p>
        `
    }
}

    cargarProductosCarrito(productosEnCarrito);

    // funcion para calcular el precio total de todos los articulos en el carrito
    function PrecioTotal () {
        let total = 0
        productosEnCarrito.forEach(producto => total += Number(producto.price) * Number(producto.cantidad))
        totalHTML.innerHTML = `<h2>Total: $${total}</h2>`
    }

    PrecioTotal();



    // aderir un evento para que al apretar el boton se elimine los datos del carrito
    btnCleanCartHTML.addEventListener("click", () => {
        if(productosEnCarrito.length < 1){
            Toastify({
                text: "No tienes productos en tu carrito!",
                duration: 3000,
                style: {
                    background: "black"
                }
                }).showToast();
        }else{
            let productosEnCarrito = []
            cargarProductosCarrito(productosEnCarrito);
            Toastify({
                text: "Se vacio tu carrito",
                duration: 3000,
                style: {
                    background: "black"
                }
                }).showToast();
        }
        
    })
    btnConfirmCartHTML.addEventListener("click", () => {
        if(productosEnCarrito.length < 1){
            Toastify({
                text: "No tienes productos en tu carrito!",
                duration: 3000,
                style: {
                    background: "black"
                }
                }).showToast();
        }else{
            let productosEnCarrito = []
            cargarProductosCarrito(productosEnCarrito);
            Toastify({
                text: "Se confirmo tu carrito codigo de seguimiento: 912314",
                duration: 3000,
                style: {
                    background: "green"
                }
                }).showToast();
                cartManager.renderCart()
        }
        
    })


    function actualizarBotonesEliminar() {
        botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }


    function eliminarDelCarrito(e) {
        
        const idBoton = e.currentTarget.id;
        console.log(idBoton)
        const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        console.log(index)
        
        productosEnCarrito.splice(index, 1);
        cargarProductosCarrito(productosEnCarrito);
    
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    }
    