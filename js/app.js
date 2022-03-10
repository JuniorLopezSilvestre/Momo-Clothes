
const carrito = document.querySelector('#carrito');
const listaRopa = document.querySelector('#lista-ropa');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
     
     listaRopa.addEventListener('click', agregarRopa);

     
     carrito.addEventListener('click', eliminarRopa);

     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}



function agregarRopa(e) {
     e.preventDefault();
     
     if(e.target.classList.contains('agregar-carrito')) {
          const Ropa = e.target.parentElement.parentElement;
          
          leerDatosRopa(Ropa);
     }
}

function leerDatosRopa(ropa) {
     const infoRopa = {
          imagen: ropa.querySelector('img').src,
          titulo: ropa.querySelector('h4').textContent,
          precio: ropa.querySelector('.precio span').textContent,
          id: ropa.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( ropa => ropa.id === infoRopa.id ) ) { 
          const Ropas = articulosCarrito.map( ropa => {
               if( ropa.id === infoRopa.id ) {
                    ropa.cantidad++;
                     return ropa;
                } else {
                     return ropa;
             }
          })
          articulosCarrito = [...Ropas];
     }  else {
          articulosCarrito = [...articulosCarrito, infoRopa];
     }

     carritoHTML();
}

function eliminarRopa(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-ropa') ) {
          
          const ropaId = e.target.getAttribute('data-id')
          
          articulosCarrito = articulosCarrito.filter(ropa => ropa.id !== ropaId);

          carritoHTML();
     }
}


function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(ropa => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${ropa.imagen}" width=100>
               </td>
               <td>${ropa.titulo}</td>
               <td>${ropa.precio}</td>
               <td>${ropa.cantidad} </td>
               <td>
                    <a href="#" class="borrar-ropa" data-id="${ropa.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

function vaciarCarrito() {


     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
