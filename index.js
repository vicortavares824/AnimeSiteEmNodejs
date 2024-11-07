const express = require("express");
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const animesModel = require('./database/db_anime.js'); 
app.set('view engine', 'ejs');
app.use(express.static('public'));
// redirecionamento para o login
app.get("/",(req,res)=>{
    res.render("login")
})

//login que leva registrar
app.get("/register",(req,res)=>{
    res.render("register");
})
//registar conta
app.post("/register/conta",(req,res)=>{
    const {nome,cpf,email,senha} = req.body

    animesModel.create({
        nome:nome,
        cpf:cpf,
        email:email,
        senha:senha
    }).then(()=>{
        res.redirect("/")
    })
});
//puxar os dados da conta
app.get("/conta",(req,res)=>{
    animesModel.findAll({raw:true}).then(animes=>{
        res.render("conta",{animes:animes})
    })
})
//verificar os dados de email e senha (senha nao criptografada)
app.post("/login",async (req,res)=>{
    const {email,senha} = req.body
    const user = await animesModel.findOne({ where: { email } }); 
    if (!user) {
        return res.status(401).send('Usuário não encontrado');
    }
    const user2 = await animesModel.findOne({ where: { senha } }); 
    if(user2){
            res.render("principal");
    }
    else{
        console.log("erro")
        res.redirect('/');
    }
})
//redirecionar para editar usuario
app.get("/editar/:id", async (req, res) => {
    const id = req.params.id;
    animesModel.findOne({ where: { id } }).then(animes => {
      res.render('contaEditar',{animes:animes})
})})
//atualizar o usuario
app.post("/update/:id", async (req, res) => {
    const {nome,email,cpf} = req.body
    const id = req.params.id;
    const user=  await animesModel.findOne({where: {id}});
    user.nome = nome;
    user.email = email;
    user.cpf = cpf;
    await user.save();
    res.redirect('/conta');
})
//deletar usuario 
app.post("/delete/:id",async(req,res)=>{
    const animes = await animesModel.destroy({
        where:{
            id:req.params.id
        }
    })
    if(animes){
        res.redirect("/");
    }
})

app.listen(8181, function (erro) {
        if (erro) {
            console.log("Erro");
        } else {
            console.log("Servidor iniciado...");
        } 
}); 
