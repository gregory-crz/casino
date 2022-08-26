const express = require('express');
const session = require('express-session');
const path = require('path');
const nunjucks = require('nunjucks');
const app = express();

app.use(express.static('node_modules/bootstrap/dist'))
app.use(session({secret: 'axel'}))

app.use(express.urlencoded({extended: true}))

// se configuran archivos estáticos 
app.use("/static", express.static("static"))

// configuracion de nunkucks, modelador de templates 
nunjucks.configure(path.resolve(__dirname, 'templates'),{
  express: app,
  autoscape: true,
  noCache: true,
  watch: true
});
// app.get('/', (req, res) =>{
//     const palabraAzar = Math.random().toString(36).substr(2,24);
//     res.render('index.html', {palabra: palabraAzar})
// })
app.get('/', (req, res) =>{

  res.render('ninja.html')
})

const money = function (max , min){
  return Math.floor(Math.random() * (max - min) + min)
}

app.post('/gold/process_money', (req, res) =>{
  let oroNuevo = undefined
  const lugar = req.body.lugar
  if(lugar =='farm'){
    oroNuevo = money(20,10)
  }else if(lugar == 'cave') {
    oroNuevo = money(10,5)
  }else if(lugar =='house'){
    oroNuevo = money(5,2)
  }else if(lugar =='casino'){
    oroNuevo = money(50,-50)
  }
  console.log(`Se generó ${oroNuevo} oros en ${lugar}`)
  res.redirect('/')
})


// Ruta por defecto
app.get('*', (req, res) => {
    res.send('Ruta no implementada')
  })
  
app.listen(3000, () => console.log('Servidor ejecutando en puerto 3000'))
