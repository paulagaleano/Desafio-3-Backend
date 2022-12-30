const express = require("express");
const ProductManager = require("./ProductManager");
const app = express();
const Puerto = 8080

const productManager = new ProductManager("./catalogo.json")

app.get("/products", async (req, res) => {
    const productos = await productManager.getProducts()
    const { limit } = req.query;

    if (limit) return res.json(productos.slice(0, limit))
    else return res.json(productos)
});

app.get("/products/:pid", async (req, res) => {
    const productos = await productManager.getProducts()
    const { pid } = req.params;
    const product = productos.find((product) => product.id === pid)

    if (product) return res.status(200).json(product);
    else return res.status(404).json({ mensaje: "Producto no encontrados"})
});

app.listen(Puerto, () => {
    console.log(`Puerto ${Puerto}`)
});


