const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./db");

const app = express();
const PORT = 3000;

const allowedOrigins = [
    "https://blog.xraiga.dev"
];
app.use(cors({
    //   origin: (origin, callback) => {
    //     // Allow requests with no Origin (Postman, curl, server-to-server)
    //     if (!origin) return callback(null, true);
    //     if (allowedOrigins.includes(origin)) {
    //       return callback(null, true);
    //     }
    //     callback(new Error("Not allowed by CORS"));
    //   },
    //   credentials: true
    origin: "*",
}));

app.use(bodyParser.json());

app.get("/api/post", (req, res) => {
    res.send("OK");
})
app.post("/api/post/:slug", (req, res) => {
    const slug = req.params.slug;
    const viewed = req.body.viewed;
    try {
        const post = db.prepare("SELECT id, views, likes FROM posts WHERE post = ?;").get(slug);
        let data = post;
        if (post) {
            if (viewed == false) {
                data.views = parseInt(data.views) + 1;
                db.prepare("UPDATE posts SET views = ? WHERE id = ?").run(data.views, data.id);
            }
        } else {
            db.prepare("INSERT INTO posts (post, views, likes) VALUES (?, ?, ?);").run(slug, 1, 0);
            data = {post: slug, views: 1, likes: 0};
        }
        res.json({data, success: true});
    } catch (error) {
        res.status(500).send("Failed");
    }
})
app.post("/api/post/:slug/like", (req, res) => {
    const slug = req.params.slug;
    try {
        const post = db.prepare("SELECT id, likes FROM posts WHERE post = ?").get(slug);
        db.prepare("UPDATE posts SET likes = ? WHERE id = ?").run(post.likes + 1, post.id);
        res.send(post.likes + 1);
    } catch (error) {
        res.status(500).send("Failed")
    }
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));