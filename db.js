/**
 * Created by pujasvi on 7/27/17.
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/try";






function signup(val,cb){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection('mycollection').insertOne(val,function () {
            console.log("item inserted");
        })
        //console.log("Database created!");
        db.close();
    });

}



function  getid(cb){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;


         var ids=db.collection('mycollection').find({},{id:1,_id:0}).sort({id:-1}).limit(1).toArray(function (err,results) {
             console.dir(results);
             db.close();
             cb(results);
         });


    });

}

function getpswrd(val,cb) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;


        var ids=db.collection('mycollection').find({name:val},{pswrd:1,_id:0}).toArray(function (err,results) {
            console.dir(results);
            db.close();
            cb(results);
        });


    });
}

function chkname(val,cb) {
    console.log("in chkname");
    MongoClient.connect(url, function(err, db) {


var ids=db.collection('mycollection').find({name:val},{pswrd:1,_id:0}).toArray(function (err,results) {
            console.dir("lngth"+results.length);
            db.close();
            cb(results);
        });



    });
}





module.exports= {
    signup: signup,
    getid:getid,
    getpswrd:getpswrd,
    chkname:chkname,
}