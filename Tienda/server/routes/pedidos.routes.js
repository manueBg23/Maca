const express = require("express");
const router = express.Router();
const pedidoController = require("./../controller/pedidos.controller");

router.get("/", pedidoController.getPedido);
router.get("/:id", pedidoController.getPedidoById);
router.post("/", pedidoController.createPedido);
router.put("/:id", pedidoController.updatePedido);
router.delete("/:id", pedidoController.deletePedido);

module.exports = router;
