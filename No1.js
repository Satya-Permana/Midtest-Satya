const express = require('express');
const app = express();
const port = 5000;

// Data sample
const users = [
    { id: "1", name: "Alex", email: "alex@gov.frld" },
    { id: "2", name: "Bernard", email: "brnd@gov.frld" },
    { id: "3", name: "Ceyen", email: "ceyenceyenceyen@gov.frld" },
    { id: "4", name: "Rens", email: "renol@gov.frld" },
    { id: "5", name: "Marsya", email: "simarsya@gov.frld" },
    { id: "6", name: "Sara", email: "sara@gov.frld" },
    { id: "7", name: "Titi", email: "titi@gov.frld" },
    { id: "8", name: "Yaya", email: "yaya@gov.frld" },
    { id: "9", name: "Zaza", email: "zaza@gov.frld" },
    { id: "10", name: "Kiki", email: "kiki@gov.frld" },
    { id: "11", name: "Juli", email: "ciaojuli@gov.frld" },
    { id: "12", name: "Mimi", email: "mimi@gov.frld" },
    { id: "13", name: "Nina", email: "nina@gov.frld" },
    { id: "14", name: "Ola", email: "ola@gov.frld" },
    { id: "15", name: "Papa", email: "papa@gov.frld" },
    { id: "16", name: "Qiqi", email: "qiqi@gov.frld" },
    { id: "17", name: "Riri", email: "riri@gov.frld" },
    { id: "18", name: "Sisi", email: "sisi@gov.frld" },
    { id: "19", name: "Toto", email: "toto@gov.frld" },
    { id: "20", name: "Ura", email: "ura@gov.frld" },
];

// Fungsi untuk filter pengguna
function filterUsers(users, search) {
    if (search) {
        const [key, value] = search.split(":");
        return users.filter(user => user[key].includes(value));
    }
    return users;
}

// Fungsi untuk sorting pengguna
function sortUsers(users, sort) {
    if (sort) {
        const [key, order] = sort.split(":");
        const reverse = order === 'desc';
        return users.sort((a, b) => {
            if (a[key] < b[key]) return reverse ? 1 : -1;
            if (a[key] > b[key]) return reverse ? -1 : 1;
            return 0;
        });
    }
    return users;
}

// Fungsi untuk pagination
function paginateUsers(users, page_number, page_size) {
    const start = (page_number - 1) * page_size;
    const end = start + page_size;
    const pagedUsers = users.slice(start, end);

    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / page_size);

    return {
        page_number,
        page_size,
        count: totalUsers,
        total_pages: totalPages,
        has_previous_page: page_number > 1,
        has_next_page: page_number < totalPages,
        data: pagedUsers,
    };
}

// Endpoint untuk mendapatkan daftar pengguna dengan pagination, filter, dan sorting
app.get('/users', (req, res) => {
    const { page_number = 1, page_size = 10, search, sort } = req.query;

    const pageNumber = parseInt(page_number);
    const pageSize = parseInt(page_size);

    // Filter
    let filteredUsers = filterUsers(users, search);

    // Sort
    filteredUsers = sortUsers(filteredUsers, sort);

    // Pagination
    const response = paginateUsers(filteredUsers, pageNumber, pageSize);

    res.json(response);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server Berjalan di -> http://localhost:${port}`);
});