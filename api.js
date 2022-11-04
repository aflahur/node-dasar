const bodyParser = require('body-parser');
const express = require('express');

const client = require('./koneksi');
const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});



client.connect(err => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("connected");
    }
})

app.get('/books', (req, res) => {
    client.query('select * from books', (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
})

app.post('/books', (req, res) => {
    const { tittle, description, author } = req.body
    client.query((`insert into books(tittle,description,author) values('${tittle}','${description}','${author}')`), (err, result) => {
        if (!err) {
            res.send('Insert Success')
        } else {
            res.send(err.message)
        }
    })
})