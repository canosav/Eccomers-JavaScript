//objeto
class Producto {
    constructor(id, categoria, nombre, precio, imagen, cantidad) {
        this.id= id;
        this.categoria = categoria; 
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad= cantidad;
    }
}

//array del objeto
const Productos = [
    new Producto(1,'ojos', 'Mascara de Pestañas', 15000, './images/pestañas.jpg', 1),
    new Producto(2,'ojos', 'Delineador', 10000, './images/delineador.jpg', 1),
    new Producto(3,'ojos', 'Sombras', 20000, './images/sombras.jpg', 1),
    new Producto(4,'labios', 'Gloss', 8000, './images/gloss.jpg', 1),
    new Producto(5,'labios', 'Labial', 10000, './images/labial.jpg', 1),
    new Producto(6,'labios', 'Delineador de Labios', 5000, './images/delineador-labios.jpg', 1),
    new Producto(7,'rostro', 'Base', 20000, './images/base.jpg', 1),
    new Producto(8,'rostro', 'Corrector', 17000, './images/corrector.jpg', 1),
    new Producto(9,'rostro', 'Polvo Compacto', 15000, './images/polvo.jpg', 1),
    new Producto(10,'rostro', 'Rubor', 10000, './images/rubor.jpg', 1),
    new Producto(11,'rostro', 'Iluminador', 10000, './images/iluminador.jpg', 1),
    new Producto(12,'rostro', 'Bronzer', 10000, './images/bronzer.jpg', 1)
];

//globales
//mostrar productos
const shopContent = document.getElementById("shopContent");
const listaDeCategorias = document.getElementsByClassName("list");
const ArrayDeListaDeCategoria = Array.from(listaDeCategorias);

//agregar al carrito
const verCarrito = document.getElementById("verCarrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const modalContainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");

//modo pink
const botonPink = document.getElementById("boton-pink");
//modo pink
let estaEnElLocal = JSON.parse(localStorage.getItem("pink"));
if(estaEnElLocal){
    const body = document.querySelector("body");
    body.classList.add("bodyPink");
};

botonPink.addEventListener("click", ()=>{
    const body = document.querySelector("body");
    if(JSON.parse(localStorage.getItem("pink"))){
        localStorage.setItem("pink", false);
        body.classList.toggle("bodyPink");
    }else{
        localStorage.setItem("pink", true);
        body.classList.toggle("bodyPink");
    }
});


const mostrarLosProductos = (producto) => { 
    let content = document.createElement ("div");
    content.className = "card";
    content.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src=${producto.imagen} alt=""/>
        <p> $ ${producto.precio}</p>
    `;
    shopContent.append(content);

    let comprar = document.createElement ("button");
    comprar.innerText = "Comprar";
    comprar.className = "comprar";
    content.append(comprar);

    comprar.addEventListener("click", ()=>{
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id);
        if(repeat){
            carrito.map((prod) => {
                if(prod.id === producto.id){
                    prod.cantidad++;
                }
            });
        }else{
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
            });
            console.log(carrito);
            saveLocal();
            carritoCounter(); 
        }
    })
}

Productos.forEach((producto)=>{
    mostrarLosProductos(producto);
});

ArrayDeListaDeCategoria.forEach(list=>{
    list.addEventListener("click", (e)=>{
        let categoria = e.target.innerText

        const ProductosFiltrados = Productos.filter((producto)=>{
            return producto.categoria.toUpperCase() == categoria.toUpperCase();
        })

        if (ProductosFiltrados.length != 0){
            shopContent.innerHTML = ""
            ProductosFiltrados.forEach((producto)=>{
                mostrarLosProductos(producto);
            });          
        }else{
            shopContent.innerHTML = ""
            Productos.forEach((producto)=>{
                mostrarLosProductos(producto);
            });
        }
    })
})

const saveLocal= () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
const crearCarrito = () =>{
    modalContainer.innerHTML=" ";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className= "modal-header";
    modalHeader.innerHTML=`
        <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton=document.createElement("h1");
    modalButton.innerText= "X";
    modalButton.className ="modal-header-button";
    modalButton.addEventListener("click", ()=>{
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalButton);
    
    carrito.forEach((producto)=>{
        let carritoContent = document.createElement("div");
        carritoContent.className= "carrito-content";
        carritoContent.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p> $${producto.precio}</p>  
            <span class="restar">-</span>
            <p> ${producto.cantidad} </p>
            <span class="sumar">+</span>
            <p> Total: $${producto.cantidad * producto.precio} </p>
        `;
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if(producto.cantidad !== 1){
                producto.cantidad --;
            }
            crearCarrito();
            saveLocal();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            producto.cantidad ++;
            crearCarrito();
            saveLocal();
        });


        let eliminar = document.createElement("span");
        eliminar.innerText= "X"
        eliminar.className="eliminar-producto"
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);


    });
    const total = carrito.reduce((acc, el)=> (acc + el.precio)*el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className= "total-content";
    totalCompra.innerHTML=`Total a pagar: $ ${total}`;
    modalContainer.append(totalCompra);

    const vaciar = document.createElement("button");
    vaciar.innerText = "Vaciar Carrito";
    vaciar.className="vaciar-carrito";
    modalContainer.append(vaciar);
    vaciar.addEventListener("click", () => {
        carrito =[];
        carritoCounter();
        saveLocal();
        crearCarrito();
    })
//BOTOM FINALIZAR COMPRA 
    const finalizarCompra = document.createElement("button");
    finalizarCompra.innerText = "Finalizar Compra";
    finalizarCompra.className="finalizar-compra";
    modalContainer.append(finalizarCompra);
    finalizarCompra.addEventListener("click", () => {
        carrito =[];
        carritoCounter();
        saveLocal();
        crearCarrito();
    })



}

verCarrito.addEventListener( "click", crearCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element)=>element.id);
    carrito = carrito.filter((carritoId)=> {
        return carritoId !== foundId;
    })
    carritoCounter(); 
    saveLocal();
    crearCarrito();
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}


carritoCounter();