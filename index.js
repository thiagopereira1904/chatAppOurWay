const express = require('express')
const app = express()

app.use(express.static("public"))

const http = require('http').Server(app)

const io = require('socket.io')(http)

const porta = process.env.PORT || 8000

http.listen(porta, function(){
  const portaStr = porta === 80 ? '' :  ':' + porta

  if (process.env.HEROKU_APP_NAME) 
      console.log('Servidor iniciado. Abra o navegador em ' + host)
  else console.log('Servidor iniciado. Abra o navegador em ' + host + portaStr)
})

app.get('/', function (requisicao, resposta) {
  resposta.sendFile(__dirname + '/index.html')
})

const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://thiago-psilva2812:dpmp658450@cluster0.wjabzhu.mongodb.net/message-database?retryWrites=true&w=majority";

const Msg = require('./models/messages');

mongoose.connect(mongoDB).then(()=>{
  console.log("conectado");
});


const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


instrument(io, {
  auth: false
});

app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });



io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('setActiveUser', function(user){
    socket.cIdUser = user.cIdUser;
    socket.sUserName = user.sUserName;
    console.log(socket['sUserName'], ": conectado")
  });

  socket.on('joinRoom', function(cIdTrip_value){
    socket.join(cIdTrip_value);

    Msg.find({cIdTrip: cIdTrip_value}).then(result =>{
      console.log(result);
      socket.emit('all_messages', result);
    }); 
  })
  
    socket.on('sendMessage', (MessageContent) => {
      dicMessageContent = {
        'cIdUser': MessageContent.cIdUser,
        'cLogin': MessageContent.cLogin,
        'cIdTrip': MessageContent.cIdTrip,
        'cContent': MessageContent.cContent,
        'GeneralDescription': MessageContent.GeneralDescription
      }

      socket.to(dicMessageContent.cIdTrip).emit(dicMessageContent);
      
      const message = new Msg(dicMessageContent)
      message.save().then(()=>{
        console.log("ok")
       })
      
      
    });


  });

