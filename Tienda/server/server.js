const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/usuario.routes"));
app.use("/pedidos", require("./routes/pedidos.routes"));
app.use("/detallesPedido", require("./routes/detallesPedido.routes"));

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
