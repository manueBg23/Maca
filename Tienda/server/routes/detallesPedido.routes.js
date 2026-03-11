const express = require("express");
const router = express.Router();
const detallesPedidoController = require("../controller/detallespedido.controller");

router.get("/", detallesPedidoController.getDetallePedido);
router.get("/:id", detallesPedidoController.getDetallePedidoById);
router.post("/", detallesPedidoController.createDetallePedido);
router.put("/:id", detallesPedidoController.updateDetallePedido);
router.delete("/:id", detallesPedidoController.deleteDetallePedido);

module.exports = router;
