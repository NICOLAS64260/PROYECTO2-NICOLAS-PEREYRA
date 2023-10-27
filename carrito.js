let productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'));

const btnCleanCartHTML = document.querySelector("#btnCleanCart")
const btnConfirmCartHTML = document.querySelector("#btnConfirmCart")
const totalHTML = document.querySelector("#total")

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
                            <button class="btn btn-delete-cart" id="btn-delete-cart-${producto.id}"><i class="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                    `
        });
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