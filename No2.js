const express = require('express');
const app = express();
const port = 5000; // Mengubah port ke 5000

// Data untuk pengguna terdaftar (contoh)
const registeredUsers = [
    { email: 'alex@gov.frld', password: 'izrev.v113' },
    { email: 'brnd@gov.frld', password: 'brnd123' },
    { email: 'ceyenceyenceyen@gov.frld', password: 'ceyenceyenceyen123' },
    { email: 'renol@gov.frld', password: 'renol123' },
    { email: 'simarsya@gov.frld', password: 'simarsya123' },
    { email: 'bob@example.com', password: 'bob123' },
    { email: 'carol@gov.frld', password: 'carol123' },
    { email: 'dave@gov.frld', password: 'dave123' },
    { email: 'eugene@gov.frld', password: 'eugene123' },
    { email: 'fiona@gov.frld', password: 'fiona123' },
    { email: 'george@gov.frld', password: 'george123' },
];

// Struktur untuk melacak upaya login
const loginAttempts = {};

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 30 * 60 * 1000; // 30 menit dalam milidetik

app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Cek apakah pengguna terkunci
    const attempts = loginAttempts[email] || { count: 0, lastFailed: null, lockedUntil: null };

    if (attempts.lockedUntil && new Date() < attempts.lockedUntil) {
        return res.status(403).json({ message: 'Hey, salah teros. Ulang lagi nanti ya...' });
    }

    const user = registeredUsers.find(u => u.email === email);

    if (!user || user.password !== password) {
        // Menambahkan ke counter upaya gagal
        attempts.count += 1;
        attempts.lastFailed = new Date();

        if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
            attempts.lockedUntil = new Date(new Date().getTime() + LOCKOUT_TIME);
        }

        loginAttempts[email] = attempts;

        return res.status(401).json({ message: 'Email atau Password salah.' });
    }

    // Reset counter jika login berhasil
    loginAttempts[email] = { count: 0, lastFailed: null, lockedUntil: null };

    // Jika login berhasil
    return res.status(200).json({ message: 'Login Berhasil.' });
});

app.listen(port, () => {
    console.log(`Server Berjalan di -> http://localhost:${port}`);
});