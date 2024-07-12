import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

let posts= [];

app.get("/", (req, res)=>{
  res.render("home", { 
    posts : posts,
  });
});

app.get("/home", (req, res)=>{
  res.render("home", {
    posts : posts,
  
  });
});

app.get("/about", (req, res)=>{
  res.render("about");
});

app.get("/contact", (req, res)=>{
  res.render("contact");
});

app.get("/create", (req, res)=>{
  res.render("create");
});

app.post("/create", (req,res)=>{
  const post = {
    title : req.body["title-name"],
    content : req.body["content"],
  }

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});



app.listen(port, ()=>{
  console.log(`Server Running on the port ${port}`);
});