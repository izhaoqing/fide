const express = require('express');
const app = express();
// const multer = require('multer');
// const upload = multer();
const bodyParser = require('body-parser');
// const { createScene, addType, requireScene, deleteType } = require('./genFiles.js');
// const { readDir } = require('./utils');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/list', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
    });
    const fn = () => {
        return Array.from({ length: req.query.n }).map((item, i) => {
            return {
                [`key${i}`]: Math.random() + 1000,
            };
        });
    };
    res.json(fn());
});

// app.post('/create', upload.single('img'), (req, res) => {
//     res.set({
//         'Access-Control-Allow-Origin': '*',
//     });
//     createScene({
//         ...req.body,
//         img: req.file,
//     }, data => res.json(data));
// });

// app.post('/add', (req, res) => {
//     res.set({
//         'Access-Control-Allow-Origin': '*',
//     });
//     addType(req.body, data => res.json(data));
// });

// app.get('/scene', (req, res) => {
//     res.set({
//         'Access-Control-Allow-Origin': '*',
//     });
//     res.json(requireScene());
// });

// app.post('/delete', (req, res) => {
//     res.set({
//         'Access-Control-Allow-Origin': '*',
//     });
//     deleteType(req.body, data => res.json(data));
// });

// app.get('/path', (req, res) => {
//     res.set({
//         'Access-Control-Allow-Origin': '*',
//     });
//     try {
//         const data = readDir(req.query);
//         res.json(data);
//     } catch {
//         res.json([]);
//     }
// });

app.listen(1033, () => {
    console.log('listen http://localhost:1033');
});
