const express = require('express');
const reload = require('reload');
const parser = require('body-parser').urlencoded({ extended: false });
const Singer = require('./models/Singer');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
reload(app);

app.get('/', (req, res) => {
    Singer.find({})
    .then(singers => res.render('home', { singers }))
    .catch(err => res.send(err));
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', parser, (req, res) => {
    const { name, link, image } = req.body;
    const singer = new Singer({ name, link, image });
    singer.save()
    .then(() => res.redirect('/'))
    .catch(() => res.send('Singer existed'));
});

app.get('/update/:_id', (req, res) => {
    Singer.findById(req.params._id)
    .then(singer => {
        if (!singer) return res.send('Khong tim thay');
        res.render('update', { singer });
    })
    .catch(err => res.send(err));
});

app.post('/update/:_id', parser, (req, res) => {
    const { image, name, link } = req.body;
    Singer.findByIdAndUpdate(req.params._id, { name, image, link })
    .then(singer => {
        if (!singer) return res.send('Khong tim thay');
        res.render('update', { singer });
    })
    .catch(err => res.send(err));
});

app.get('/remove/:_id', (req, res) => {
    Singer.findByIdAndRemove(req.params._id)
    .then(singer => {
        if (!singer) return res.send('Khong tim thay');
        res.redirect('/');
    })
    .catch(err => res.send(err));
});

app.listen(3000, () => console.log('Server started!'));

// Singer.insertMany([
//     {
//         name: 'Karik',
//         link: 'https://mp3.zing.vn/nghe-si/Karik',
//         image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/a/0/a0927398989d4c5b18c56880bd56442b_1509531352.jpg'
//     },
//     {
//         name: 'Đức Phúc',
//         link: 'https://mp3.zing.vn/nghe-si/Duc-Phuc',
//         image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/d/7/d7f34aa6b1112e4b605f6c6e7eccd162_1509437674.jpg'
//     },
//     {
//         name: 'Hương Tràm',
//         link: 'https://mp3.zing.vn/nghe-si/Huong-Tram',
//         image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/5/0/50e613e21b499290633d17cff0776e61_1489400757.jpg'
//     }
// ]);
