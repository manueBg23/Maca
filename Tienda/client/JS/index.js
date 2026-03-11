const btnCard = document.querySelector(".icont-cart");
const containerCardProducts = document.querySelector(
  ".container-cart-products"
);

btnCard?.addEventListener("click", () => {
  containerCardProducts.classList.toggle("hidden-cart");
});

/* ############################## */
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

// Lista de todos los contenedores de productos
const productsList = document.querySelectorAll(".item-container");

// Variable de arreglos de productos
let allProducts = [];

const valorTotal = document.querySelector(".total");
const countProducts = document.querySelector("#contador-productos");

// Define removeProduct fuera de showHTML
// Define removeProduct fuera de showHTML
function removeProduct(index) {
  // Eliminar el producto del array allProducts
  allProducts.splice(index, 1);

  // Volver a mostrar los productos en el DOM
  showHTML();
}

const hacerPedido = () => {
  window.open("/client/Formulario/formulario.html", "_blank");
};

const enviar = () => {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const cedula = document.getElementById("cedula").value;
  const email = document.getElementById("email").value;
  const celular = document.getElementById("celular").value;
  const direccion = document.getElementById("direccion").value;

  const productsString = localStorage.getItem("products");
  const products = JSON.parse(productsString);
  console.log(products);

  const fecha = new Date();
  const fechaFormateada = fecha.toISOString().split("T")[0] + " 00:00:00";

  fetch("http://localhost:3000/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
      email: email,
      celular: celular,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      fetch("http://localhost:3000/pedidos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          direccion: direccion,
          idUsuario: data.insertId,
          total: products.reduce((acc, product) => {
            const price = parseInt(product.price.replace(/\D/g, ""), 10);
            const quantity = product.quantity || 1;
            return acc + price * quantity;
          }, 0),
          fechaCompra: fechaFormateada,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let productosComprados = [];
          products.forEach((product) => {
            fetch("http://localhost:3000/detallesPedido/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idPedidos: data.insertId,
                cantidad: product.quantity,
                nombreProducto: product.title,
                precioProducto: product.price.replace(/\./g, "").slice(1),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
          Promise.all(products)
            .then(() => {
              alert(
                "Pedido realizado con exito. Gracias por tu compra"
              );
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
    });
};

const showHTML = () => {
  if (!allProducts.length) {
    containerCardProducts.innerHTML = `
      <p class="cart-empty">El carrito está vacío</p>
    `;
  } else {
    rowProduct.innerHTML = "";
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach((product, index) => {
      const containerProduct = document.createElement("div");
      containerProduct.classList.add("cart-product");

      const price = product.price.replace(/\./g, "").slice(1);
      const subtotal = parseInt(product.quantity * price);
      total += subtotal;

      containerProduct.innerHTML = `
        <div class="info-cart-product delete_${index}">
          <span class="catidad-producto-carrito">${product.quantity}</span>
          <p class="titulo-carrito-producto">${product.title}</p>
          <span class="precio-producto-carrito">${subtotal}</span>
        </div>
        <div class="icon close" onclick="removeProduct(${index})">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      `;

      rowProduct?.append(containerProduct);
      totalOfProducts += product.quantity; // Incrementar el contador de productos
    });

    localStorage.setItem("products", JSON.stringify(allProducts));
    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
  }
};

productsList.forEach((product) => {
  product.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const product = e.target.parentElement;

      const infoProduct = {
        quantity: 1,
        title: product.querySelector("h2").textContent,
        price: product.querySelector("p").textContent,
      };

      const exist = allProducts.some(
        (product) => product.title === infoProduct.title
      );

      if (exist) {
        const products = allProducts.map((product) => {
          if (product.title === infoProduct.title) {
            product.quantity++;
            return product;
          } else {
            return product;
          }
        });

        allProducts = [...products];
      } else {
        allProducts = [...allProducts, infoProduct];
      }

      showHTML();
    }
  });
});

rowProduct?.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon.close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    showHTML();
  }
});
