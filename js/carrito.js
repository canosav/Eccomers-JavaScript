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
        //swal dependiendo del modo que este la pagina
        if(carrito.length !== 0 ){
            if(JSON.parse(localStorage.getItem("pink"))){
                Swal.fire({
                    title: "¿Quiere vaciar el carrito?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#00CC00",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, vacialo",
                    cancelButtonText: "Mejor no",
                    color: "rgb(185, 9, 141)", 
                    background: "rgb(248, 205, 237)"
                })
                .then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Se vacio el carrito",
                        text: "Su carrito se vacio correctamente, vuelva pronto",
                        icon: "success",
                        color: "rgb(185, 9, 141)", 
                        confirmButtonColor: "rgb(185, 9, 141)",
                        background: "rgb(248, 205, 237)"
                      });
                      carrito =[];
                      carritoCounter();
                      saveLocal();
                      crearCarrito();
                    }
                });
            }else{
                Swal.fire({
                    title: "¿Quiere vaciar el carrito?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#00CC00",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, vacialo",
                    cancelButtonText: "Mejor no"
                }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Se vacio el carrito",
                        text: "Su carrito se vacio correctamente, vuelva pronto",
                        icon: "success",
                        confirmButtonColor: "rgb(153, 152, 152)"
                      });
                    
                      carrito =[];
                      carritoCounter();
                      saveLocal();
                      crearCarrito();
                    }
                });
            }
        }else{
            if(JSON.parse(localStorage.getItem("pink"))){
                Swal.fire({
                    title: "Su carrito ya esta vacio",
                    icon: "warning",
                    color: "rgb(185, 9, 141)", 
                    confirmButtonColor: "rgb(185, 9, 141)",
                    background: "rgb(248, 205, 237)"
                })
            }else{
                Swal.fire({
                    title: "Su carrito ya esta vacio",
                    icon: "warning",
                    confirmButtonColor: "rgb(153, 152, 152)"
                })
            }
        }

    })
 
    const finalizarCompra = document.createElement("button");
    finalizarCompra.innerText = "Finalizar Compra";
    finalizarCompra.className="finalizar-compra";
    modalContainer.append(finalizarCompra);
    finalizarCompra.addEventListener("click", () => {
        let numeroCompra = getRandomIntInclusive(1, 100000);
        //swal dependiendo del modo que este la pagina
        if(carrito.length !== 0 ){
            if(JSON.parse(localStorage.getItem("pink"))){
                Swal.fire({
                    title: "¿Quiere finalizar la compra?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#00CC00",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, finalizar",
                    cancelButtonText: "Mejor sigo comprando",
                    color: "rgb(185, 9, 141)", 
                    background: "rgb(248, 205, 237)"
                }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: `¡Compra numero #${numeroCompra} realizada!`,
                        text: "Dentro de una semana le llegaran sus productos",
                        icon: "success",
                        color: "rgb(185, 9, 141)", 
                        confirmButtonColor: "rgb(185, 9, 141)",
                        background: "rgb(248, 205, 237)"
                      });
                      carrito =[];
                      carritoCounter();
                      saveLocal();
                      crearCarrito();
                    }
                });
            }else{
                Swal.fire({
                    title: "¿Quiere finalizar la compra?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#00CC00",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, finalizar",
                    cancelButtonText: "Mejor sigo comprando",
                }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: `¡Compra numero #${numeroCompra} realizada!`,
                        text: "Dentro de una semana le llegaran sus productos",
                        icon: "success",
                        confirmButtonColor: "rgb(153, 152, 152)"
                      });
                      carrito =[];
                      carritoCounter();
                      saveLocal();
                      crearCarrito();
                    }
                });
            }
        }else{
            if(JSON.parse(localStorage.getItem("pink"))){
                Swal.fire({
                    title: "Su carrito esta vacio, no se puede realizar una compra",
                    icon: "warning",
                    color: "rgb(185, 9, 141)", 
                    confirmButtonColor: "rgb(185, 9, 141)",
                    background: "rgb(248, 205, 237)"
                })
            }else{
                Swal.fire({
                    title: "Su carrito esta vacio, no se puede realizar una compra",
                    icon: "warning",
                    confirmButtonColor: "rgb(153, 152, 152)"
                })
            }
        }
    })

}

verCarrito.addEventListener( "click", crearCarrito);

const eliminarProducto = () => {
    //swal dependiendo del modo que este la pagina
    if(JSON.parse(localStorage.getItem("pink"))){
        Swal.fire({
            title: "¿Quieres eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminalo",
            confirmButtonColor: "#00CC00",
            cancelButtonColor: "#d33",
            cancelButtonText: "Mejor no",
            color: "rgb(185, 9, 141)",
            background: "rgb(248, 205, 237)"
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Producto eliminado!",
                icon: "success",
                color: "rgb(185, 9, 141)", 
                confirmButtonColor: "rgb(185, 9, 141)",
                background: "rgb(248, 205, 237)"
            });
            
            const foundId = carrito.find((element)=>element.id);
            carrito = carrito.filter((carritoId)=> {
                return carritoId !== foundId;
            })
            carritoCounter(); 
            saveLocal();
            crearCarrito();
            }
        });

    }else{

        Swal.fire({
            title: "¿Quieres eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminalo",
            confirmButtonColor: "#00CC00",
            cancelButtonColor: "#d33",
            cancelButtonText: "Mejor no"
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Producto eliminado!",
                icon: "success",
                confirmButtonColor: "rgb(153, 152, 152)"
            });
            
            const foundId = carrito.find((element)=>element.id);
            carrito = carrito.filter((carritoId)=> {
                return carritoId !== foundId;
            })
            carritoCounter(); 
            saveLocal();
            crearCarrito();
            }
        });
    }
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}


carritoCounter();

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};