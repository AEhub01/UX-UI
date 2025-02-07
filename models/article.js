const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 3307,
});

const Article = {
    getAll: (callback) => {
        pool.query("SELECT * FROM articles ORDER BY created_at DESC", callback);
    },
    getById: (id, callback) => {
        pool.query("SELECT * FROM articles WHERE id = ?", [id], callback);
    },
    add: (title, content, image, callback) => {
        pool.query("INSERT INTO articles (title, content, image) VALUES (?, ?, ?)", [title, content, image], callback);
    },
    update: (id, title, content, image, callback) => {
        pool.query("UPDATE articles SET title = ?, content = ?, image = ? WHERE id = ?", [title, content, image, id], callback);
    },
    delete: (id, callback) => {
        pool.query("DELETE FROM articles WHERE id = ?", [id], callback);
    }
};

module.exports = Article;