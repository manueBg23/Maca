const connection = require("../db");

const getUsuario = (req, res) => {
    connection.query("SELECT * FROM usuario", (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
};

const getUsuarioById = (req, res) => {
    const { id } = req.params;
    connection.query(
        "SELECT * FROM usuario WHERE idUsuario = ?",
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

const createUsuario = (req, res) => {
    const data = req.body;
    connection.query("INSERT INTO usuario SET ?", [data], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
};

const updateUsuario = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    connection.query(
        "UPDATE usuario SET ? WHERE idUsuario = ?",
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

const deleteUsuario = (req, res) => {
    const { id } = req.params;
    connection.query(
        "DELETE FROM usuario WHERE idUsuario = ?",
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
    getUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};
