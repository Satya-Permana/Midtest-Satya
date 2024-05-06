const express = require('express');
const app = express();
const port = 5000;

// Simulasi database dalam-memory untuk menyimpan produk
let products = [];

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint CREATE: Tambah produk baru
app.post('/products', (req, res) => {
    const { name, description, price, quantity } = req.body;

    // ID unik untuk produk baru
    const id = products.length + 1;

    const newProduct = {
        id,
        name,
        description,
        price,
        quantity
    };

    products.push(newProduct);

    res.status(201).json({ message: 'Produk Dibuat!', product: newProduct });
});

// Endpoint READ: Dapatkan semua produk
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// Endpoint UPDATE: Perbarui produk berdasarkan ID
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = products.find(p => p.id == id);

    if (!product) {
        return res.status(404).json({ message: 'Tidak Ada Produk!' });
    }

    // Update atribut produk
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    res.status(200).json({ message: 'Produk Telah Diupdate', product });
});

// Endpoint DELETE: Hapus produk berdasarkan ID
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex(p => p.id == id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Produk Tidak Ditemukan' });
    }

    products.splice(productIndex, 1);

    res.status(200).json({ message: 'Produk Telah Dihapus' });
});

app.listen(port, () => {
    console.log(`Server Berjalan di -> http://localhost:${port}`);
});
