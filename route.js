const express = require('express');
const router = express.Router();

const db = require('./db');
let User = {}, Post = {}, owner = {}, Posts = {}
const post_ids = [1, 3, 4, 6];
const uid = 1;
// Number one question
router.get('/userPosts', (req, res, next) => {
    const u_sql = `SELECT u.id, u.username, u.full_name, u.profile_picture, f.following_id
        FROM user as u, follow as f Where u.id = ${uid}`;
    db.query(u_sql, (err, data, fields) => {
        if (err) throw err;
        
        User = data;
    })

    const post = `SELECT 
    l.user_id,
    p.id as liked, p.description, p.image, p.created_at
    FROM like_post as l, post as p Where l.user_id = p.user_id AND p.id IN (${post_ids})`

    db.query(post, (err, data1, fields) => {
        if (err) throw err
        Post = data1
    })

    res.send({
        status: true,
        data: {Post, owner: User } 
    })
    
});
// Number two question
router.get('/posts', (req, res, next) => {
    const posts = `SELECT
    p.id, p.description, p.image, p.created_at
    FROM post as p Where p.id IN (${post_ids})`

    db.query(posts, (err, data, fields) => {
        if (err) throw err
        Posts = data
    })

    res.send({
        status: true,
        data: {Posts } 
    })
})

module.exports = router;