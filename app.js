
var app = (require('express'))()
var mongoose = require('mongoose')

mongoose.connect("mongodb://heroku_hg7w9btc:pk2qmot0qg7ihlep1stg9hu1p7@ds157654.mlab.com:57654/heroku_hg7w9btc")

var CardSchema = new mongoose.Schema({
  card:String,
  sign:String
});

var cardModel = mongoose.model('cards', CardSchema)

app.get("/", (req, res)=>{
  cardModel.find({sign:"Heart"},(err, docs)=>{
      res.json(docs)
  })
})

app.post("/", (req, res)=>{
  var body =  req.body

  var newCard = new cardModel(body);
  newCard.save();
  res.send(200)


})

app.get("/:id", (req, res)=>{
  var id = req.params.id;

  cardModel.findById(id, (err, docs)=>{
     res.json(docs);
  })
})

app.listen(3000);
