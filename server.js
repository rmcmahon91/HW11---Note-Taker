var fs = require("fs")
var express = require("express");

var path = require("path")

var app = express();
var PORT = process.env.PORT || 3000;
var db = require("./db/db.json")

var id = db.length + 1

app.use(express.static("public"))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
// Routes

app.get("/", function(req, res) {
    res.send("Welcome to Note Taker!");
  });
  
  
  
  app.get("/api/notes", function(req, res) {
  console.log("hello", db)

    res.json(db);
  });

app.delete("/api/notes/:id", function(req, res){
  var getId = req.params.id
  getId = parseInt(getId)
  console.log(getId)
  for (var i =0; i < db.length; i++)
   if (db[i].id === getId) {
      db.splice(i,1);
      break;
   }

   fs.writeFile("./db/db.json", JSON.stringify(db), function(err){
     res.json(db)
   })
})

  app.post("/api/notes", function(req, res) {
        
         req.body.id = id++
         console.log(req.body)
          db.push(req.body)

          fs.writeFile("./db/db.json",  JSON.stringify(db) , function(err){
            res.json(db)
          })
          
  });


app.get("/notes", function(req, res){
    console.log(path.join(__dirname, "./public/notes.html"))
     res.sendFile(path.join(__dirname, "./public/notes.html"))
})


  app.listen(PORT,function(){
      console.log("app is listening http://localhost:" + PORT)
  })