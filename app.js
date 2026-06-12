const express=require('express');
const app=express();
const path=require('path');

const userModels=require('./models/userModel')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/read', async (req, res) => {
    let allusers=await userModels.find();
    res.render('read',{users:allusers});
});


app.post('/create', async (req, res) => {
    let user=await userModels.create({
        name:req.body.name,
        email:req.body.email,
        image:req.body.image
    })
    
    res.redirect('/read');
})

app.listen(3000);