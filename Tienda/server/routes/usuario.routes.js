const express = require("express");
const router = express.Router();
const usuarioController = require("./../controller/usuario.controller");

router.get("/", usuarioController.getUsuario);
router.get("/:id", usuarioController.getUsuarioById);
router.post("/", usuarioController.createUsuario);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

module.exports = router;