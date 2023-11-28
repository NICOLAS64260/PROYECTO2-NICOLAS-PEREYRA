let productoVerMas = JSON.parse(localStorage.getItem("productos-ver-mas"));
let productovermasarray = []
productovermasarray.push(productoVerMas);
console.log(typeof productovermasarray)


const vermashtml = document.querySelector (".contenedor-ver-mas")

function cargarProductoVerMas() {
        vermashtml.innerHTML = "";
            
                vermashtml.innerHTML += `
                <div class="contenedor-ver-mas">
                <img src= ${productoVerMas.image} class="imgvermas">
                <div class="contenedor-ver-mas-2">
                    <h2>${productoVerMas.title}</h2>
                    <div class="precio">$${productoVerMas.price}</div>
                    <div>${productoVerMas.description}</div>
                    <a href="index.html"><button class="botn card-btn-add" id="${productoVerMas.id}">VOLVER</button></a>
                </div>
            </div>
                    `
        ;


    
}

cargarProductoVerMas();