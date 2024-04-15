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
//modo pink
const botonDark = document.getElementById("boton-pink");

//mostrar productos
const shopContent = document.getElementById("shopContent");
const listaDeCategorias = document.getElementsByClassName("list");
const ArrayDeListaDeCategoria = Array.from(listaDeCategorias);

//agregar al carrito
const verCarrito = document.getElementById("verCarrito");
const carrito =  []
const modalContainer = document.getElementById("modalContainer");

//modo pink
let estaEnElLocal = JSON.parse(localStorage.getItem("pink"));
if(estaEnElLocal){
    const body = document.querySelector("body");
    body.classList.add("bodyPink");
};

botonDark.addEventListener("click", ()=>{
    const body = document.querySelector("body");
    if(JSON.parse(localStorage.getItem("pink"))){
        localStorage.setItem("pink", false);
        body.classList.toggle("bodyPink");
    }else{
        localStorage.setItem("pink", true);
        body.classList.toggle("bodyPink");
    }
});

//mostrar los productos
const mostrarLosProductos = (producto)=>{ 
    let content = document.createElement ("div");
    content.className = "card";
    content.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src=${producto.imagen} alt=""/>
        <p> $ ${producto.precio}</p>
    `;
    shopContent.append(content);

    const comprar = document.createElement ("button");
    comprar.innerText = "Comprar";
    comprar.className = "comprar";
    content.append(comprar);

    //funcionalidad al boton 
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
        }

        console.log(carrito);
    })
};

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

const crearCarrito = ()=>{
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
        const carritoContent = document.createElement("div");
        carritoContent.className= "carrito-content";
        carritoContent.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p> $${producto.precio}</p>  
            <p> ${producto.cantidad} </p>
            <p> Total: $${producto.cantidad * producto.precio} </p>
        `;
        modalContainer.append(carritoContent);
    });
    
    const total = carrito.reduce((acc, el)=> (acc + el.precio)*el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className= "total-content";
    totalCompra.innerHTML=`Total a pagar: $ ${total}`;
    modalContainer.append(totalCompra);

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

verCarrito.addEventListener("click", crearCarrito);


const eliminarProducto = (e, producto)=>{
    const Padre = e.target.parentElement
    Padre.remove()
    
    const ArrayDeProductos = carrito.map(producto => producto.id)
    const indice = ArrayDeProductos.indexOf(producto.id)
    
    if(carrito[indice].cantidad == 1){
        carrito.splice(indice, 1)
    }else{
        carrito[indice].cantidad -= 1
    }
    
    crearCarrito();        
}