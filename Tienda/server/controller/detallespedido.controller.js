const connection = require("../db");

const getDetallePedido = (req, res) => {
  connection.query("SELECT * FROM detalles_pedido", (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getDetallePedidoById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM detalles_pedido WHERE idDetallePedido = ?",
    [id],
    (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const createDetallePedido = (req, res) => {
  const data = req.body;
  connection.query("INSERT INTO detalles_pedido SET ?", [data], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const updateDetallePedido = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connection.query(
    "UPDATE detalles_pedido SET ? WHERE idDetallePedido = ?",
    [data, id],
    (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const deleteDetallePedido = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM detalles_pedido WHERE idDetallePedido = ?",
    [id],
    (err, rows) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getDetallePedido,
  getDetallePedidoById,
  createDetallePedido,
  updateDetallePedido,
  deleteDetallePedido,
};
