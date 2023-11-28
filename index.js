let productos = [];

//ACA ESTA EL FECTCH PARA TRAER EL ARRAY DE LOS PRODUCTOS
fetch('./productos.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    createCartas(productos, articulohtml)})

//declaraciones
const articulohtml = document.querySelector (".articulos")
const botonesCategorias = document.querySelectorAll(".boton-categoria")
let botonAgregar = document.querySelectorAll(".btn")
let botonVerMas = document.querySelectorAll(".botn")


//  * Esta funcion recorre un array y renderiza una carta de compra por cada elemento.
//  * @param {*[]} array 
//  * @param {*} contendor 
function createCartas(array, contendor){

  contendor.innerHTML = "";

  array.forEach(producto => {
    contendor.innerHTML += `
    <div class="card">
        <h3>${producto.title}</h3>
        <img src= ${producto.image} class="card-img">
        <div class="card-info-container">
            <p>Price: $${producto.price} </p>
            <span class="card-category">${producto.category}</span>
        </div>
        <button class="btn card-btn-add" id="${producto.id}">Add</button>
        <a href="VerMas.html"><button class="botn card-btn-add" id="${producto.id}">Ver Mas</button></a>
        
    </div>
    `;
    
  })
  //una vez creado el html ahora si se le puede agregar el evento para los botones
  actualizarBotonesAgregar();
  actualizarBotonesVerMas()
}

//ACA DECLARO EL EVENTO PARA QUE CADA VEZ QUE APRETEN EL BOTON DEL NAVEGADOR SE LE CARGUEN LOS ELEMENTOS CON ESE ID
botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {

    const productosBoton = productos.filter(producto => producto.category === e.currentTarget.id);
    createCartas(productosBoton, articulohtml);
  })
})


//funcion que se encarga de que cada vez que apreten el botton de aderir se active la funcion que se encarga de eso
// se debio hacer una funcion debido a que el HTML de los botones no esta creado desde el inicio sino que se crea de forma dinamica con JavaScript
function actualizarBotonesAgregar(){
  botonAgregar = document.querySelectorAll(".btn")

  botonAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
});
}

function actualizarBotonesVerMas(){
  botonVerMas = document.querySelectorAll(".botn")

  botonVerMas.forEach(boton => {
    boton.addEventListener("click", IrVerMas);
});
}

//declaro variable array de "productoEnCarrito"
let productosEnCarrito = []
let productoVerMas = []

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
//esta funcion se ejecuta por cada vez que apreten el boton de aderir al carrito
//Tarea: Pushea todos los datos de un producto al array de "productosEnCarrito"
//en el caso de que un producto ya exista en el carrito aumenta el valor de "cantidad"
function agregarAlCarrito(e) {


  const idBoton = parseInt(e.currentTarget.id);
  const productoAgregado = productos.find(producto => producto.id === idBoton);
  const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

  if(index != -1) {
      productosEnCarrito[index].cantidad++;
  } else {
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado);
  }
  actualizarNumerito();

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function IrVerMas(e){
  const idBotn = parseInt(e.currentTarget.id);
  const productoVerMas = productos.find(producto => producto.id === idBotn);
  console.log(productoVerMas)
  localStorage.setItem("productos-ver-mas", JSON.stringify(productoVerMas));
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
}