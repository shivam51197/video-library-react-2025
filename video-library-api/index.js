var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var app = express();
//CORS is required for handling request method like POST, PUT, DELETE 

app.use(cors());
//required for converting data into JSON
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var connectionString = "mongodb://127.0.0.1:27017";


//API routers

app.get('/get-admin', (req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
    
});

app.get('/get-videos', (req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");
        // .find({}) fetches all documents from the collection (since an empty object {} is passed as a filter).
        database.collection("tblvideos").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
    
});

app.get('/get-categories', (req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
    
});

app.get('/get-users', (req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");
        database.collection("tblusers").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
    
});

app.get('/get-user/:userid', (req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");
        database.collection("tblusers").find({UserId:req.params.userid}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
    
});

app.get('/get-video/:id', (req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");
        database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
    
});

app.get('/get-video/:categoryid', (req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");
        database.collection("tblvideos").find({CaterotyId:parseInt(req.params.categoryid)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
    
});

app.post("/register-user",(req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");

        var user= {
          UserId: req.body.UserId,
          UserName: req.body.UserName,
          Passward: req.body.Passward,
          Email: req.body.Email,
          Mobile: req.body.Mobile
        };
        database.collection("tblusers").insertOne(user).then(()=>{
           console.log(`User Registerd`);
           res.end();
        });
    });
});

app.get("/filter-videos/:categoryid", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
        var database  = connectionObject.db("videodb");
        database.collection("tblvideos").find({CategoryId:parseInt(req.params.categoryid)}).toArray().then(documents=>{
              res.send(documents);
              res.end();
        });
    });

});

app.post("/add-category",(req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");

            var category= {
                CaterotyId: parseInt(req.body.CaterotyId),
                CategoryName: req.body.CategoryName,

            }
        database.collection("tblcategories").insertOne(category).then(()=>{
           console.log(`Category Added`);
           res.end();
        });
    });
});

app.post("/add-video",(req,res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");

           var video= {
            VideoId: parseInt(req.body.VideoId),
            Title:req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views: parseInt(req.body.Views),
            CategoryId: parseInt(req.body.CategoryId),
            Comments: [req.body.Comments]
           }
        database.collection("tblvideos").insertOne(video).then(()=>{
           console.log(`Video Added`);
           res.end();
        });
    });
});

app.put("/edit-video/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database= connectionObject.db("videodb");

        var video= {
            VideoId: parseInt(req.body.VideoId),
            Title:req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views: parseInt(req.body.Views),
            CategoryId: parseInt(req.body.CategoryId),
            Comments: [req.body.Comments]
           }

        database.collection("tblvideos").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
            console.log("Video update successfully");
            res.end();
        });
    });
});

app.delete("/delete-video/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("videodb");

        database.collection("tblvideos").deleteOne({VideoId:parseInt(req.params.id)})
        .then(()=>{
            console.log("Video Deleted.");
            res.end();
        })

    })
})

app.listen(5050);
console.log(`Server Started: http://127.0.0.1:5050`);