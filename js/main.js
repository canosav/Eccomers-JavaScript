//globales
//mostrar productos
const shopContent = document.getElementById("shopContent");
const listaDeCategorias = document.getElementsByClassName("list");
const ArrayDeListaDeCategoria = Array.from(listaDeCategorias);
const productosDOM = document.getElementById("productos")

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
        Swal.fire({
            title: "Activaste el modo Barbie!!",
            text: "Ahora a seguir comprando!!",
            imageUrl: "./images/barbie.jpg",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Imagen de barbie",
            color: "rgb(185, 9, 141)", 
            confirmButtonColor: "rgb(185, 9, 141)",
            background: "rgb(248, 205, 237)"
        });
    }
});

fetch("./info.json")
.then(datos => {
   if(!datos.ok){
    throw new Error("Error al traer los datos")
   }else{
    return datos.json() 
   }
}).then(productos => {
    productos.articulos.forEach(producto => {
        mostrarLosProductos(producto);
    })
    separarPorCategoria(productos);
})
.catch(e => {
    console.error("Hubo un error al operar con fetch " + e.message)
})

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
        //swal dependiendo del modo que este la pagina
        if(JSON.parse(localStorage.getItem("pink"))){
            Swal.fire({
                title: `¡${producto.nombre} se agrego correctamente!`,
                icon: "success",
                width: "400px",
                color: "rgb(185, 9, 141)", 
                confirmButtonColor: "rgb(185, 9, 141)",
                background: "rgb(248, 205, 237)"
            });
        }else{
            Swal.fire({
                title: `¡${producto.nombre} se agrego correctamente!`,
                icon: "success",
                width: "400px",
                confirmButtonColor: "rgb(153, 152, 152)",
            });
        }
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

const separarPorCategoria = (producto) => {
    ArrayDeListaDeCategoria.forEach(list => {
      list.addEventListener("click", (e) => { 
        let categoria = e.target.innerText;
        const ProductosFiltrados = producto.articulos.filter((p) => {
          return p.categoria.toUpperCase() === categoria.toUpperCase();
        });

        if (ProductosFiltrados.length > 0) {
          shopContent.innerHTML = ""; 
          ProductosFiltrados.forEach((p) => {
            mostrarLosProductos(p); 
          });
        } else {
          shopContent.innerHTML = "";
          producto.articulos.forEach((p) => {
            mostrarLosProductos(p);
          });
        }
      });
    });
};
  

