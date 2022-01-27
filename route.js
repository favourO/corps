const express = require('express');
const router = express.Router();

const db = require('./db');
let dataset = {}
let User = {}, Post = {}
const post_ids = [1, 3, 4, 6];
const uid = 1;

router.get('/posts', (req, res, next) => {
    const u_sql = `SELECT u.id, u.username, u.full_name, u.profile_picture, f.following_id
        FROM user as u, follow as f Where u.id = ${uid}`;
    db.query(u_sql, (err, data, fields) => {
        if (err) throw err;
        
        User = data;
    })

    const post = `SELECT 
    u.id, u.username, u.full_name, u.profile_picture,
    p.id as post_id, p.description, p.image, p.created_at
    FROM user as u, post as p Where u.id = p.user_id AND p.id IN (${post_ids})`

    db.query(post, (err, data1, fields) => {
        if (err) throw err
        Post = data1
    })

    res.send({
        status: true,
        data: {Post, User} 
    })
    
    console.log(User)
});

module.exports = router;