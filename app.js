const express = require("express");
const { createCanvas, loadImage, registerFont } = require("canvas");
const path = require("path");

const app = express();
const PORT = 3000;

// Daftarkan font OTF/TTF
const fontPath = path.join(__dirname, "mY.otf");
registerFont(fontPath, { family: "MyFont" });

const aFontPath = path.join(__dirname, "Azonix.otf");
registerFont(aFontPath, { family: "AFont" });

const templatePath = path.join(__dirname, "mY.png");
const editorPath = path.join(__dirname, "edit.png");
const yappingPath = path.join(__dirname, "yapping.png");

app.get("/mlbb", async (req, res) => {
    const { username } = req.params;
    try {
        const img = await loadImage(templatePath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        // Gambar template ke canvas
        ctx.drawImage(img, 0, 0);

        // Atur teks
        ctx.font = "220px MyFont"; // Ukuran besar sesuai template
        ctx.fillStyle = "white"; // Warna teks
        ctx.textAlign = "left";

        // Ukuran dan posisi teks
        const x = 70; // Geser ke kanan sesuai template
        const y = 570; // Posisi vertikal
        ctx.fillText(username.toUpperCase(), x, y)

        // Kirim gambar sebagai respons
        res.set("Content-Type", "image/png");
        res.send(canvas.toBuffer("image/png"));

    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing image");
    }
});

app.get("/editor", async (req, res) => {
    const { username } = req.params;
if (!username) return res.status(400).json
    try {
        const img = await loadImage(editorPath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        // Gambar template ke canvas
        ctx.drawImage(img, 0, 0);

        // Atur teks
        ctx.font = "220px MyFont"; // Ukuran besar sesuai template
        ctx.fillStyle = "black"; // Warna teks
        ctx.textAlign = "center"; // Pastikan teks rata tengah

        // Hitung posisi tengah
        const textWidth = ctx.measureText(username.toUpperCase()).width;
        const x = img.width / 2; // Tengah gambar
        const y = 620; // Posisi vertikal

        // Gambar teks di posisi tengah
        ctx.fillText(username.toUpperCase(), x, y);

        // Kirim gambar sebagai respons
        res.set("Content-Type", "image/png");
        res.send(canvas.toBuffer("image/png"));

    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing image");
    }
});

app.get("/yapping", async (req, res) => {
    const { username } = req.params;
        if (!username) return res.status(400).json
    try {
        const img = await loadImage(yappingPath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        // Gambar template ke canvas
        ctx.drawImage(img, 0, 0);

        // Atur teks
        ctx.font = "120px AFont"; // Ukuran besar sesuai template
        ctx.fillStyle = "black"; // Warna teks
        ctx.textAlign = "center"; // Pastikan teks rata tengah

        // Hitung posisi tengah
        const textWidth = ctx.measureText(username.toUpperCase()).width;
        const x = img.width / 2; // Tengah gambar
        const y = 600; // Posisi vertikal

        // Gambar teks di posisi tengah
        ctx.fillText(username.toUpperCase(), x, y);

        // Kirim gambar sebagai respons
        res.set("Content-Type", "image/png");
        res.send(canvas.toBuffer("image/png"));

    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing image");
    }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
