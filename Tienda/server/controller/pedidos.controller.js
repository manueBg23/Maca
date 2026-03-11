const connection = require("../db");

const getPedido = (req, res) => {
  connection.query("SELECT * FROM pedidoS", (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const getPedidoById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM pedidos WHERE idPedidos = ?",
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


const createPedido = (req, res) => {
  const data = req.body;
  connection.query("INSERT INTO pedidos SET ?", [data], (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

const updatePedido = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connection.query(
    "UPDATE pedidos SET ? WHERE idPedidos = ?",
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

const deletePedido = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM pedidos WHERE idPedidos = ?",
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
  getPedido,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};

