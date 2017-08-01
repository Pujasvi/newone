/**
 * Created by pujasvi on 7/27/17.
 */
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/try";

var url= process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://pujasvi:Pujasvi%40789@ds127783.mlab.com:27783/pujasvi1";
//var url="mongodb://pujasvi:Pujasvi%40789@cluster0-shard-00-00-qb2f2.mongodb.net:27017,cluster0-shard-00-01-qb2f2.mongodb.net:27017,cluster0-shard-00-02-qb2f2.mongodb.net:27017/try?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
//var MONGODB_URI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost", // Make sure to replace that URI with the one provided by MongoLab






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
function cre(val,cb){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection('mycollection2').insertOne(val,function () {
            console.log("item inserted for create evnt");
        })
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

function mycre(val,cb) {
    console.log("in mycre");
    MongoClient.connect(url, function(err, db) {
        var ids=db.collection('mycollection2').find({city:val},{_id:0}).toArray(function (err,results) {
            console.dir("res in db mycre"+results);
            db.close();
            cb(results);
        });



    });
}

function getabt(val,cb) {
    console.log("in getabt");
    MongoClient.connect(url, function(err, db) {
        {}

        var ids=db.collection('mycollection2').find( {$and:[{city:val.city} ,{name:val.eve}]},{_id:0,abt:1}).toArray(function (err,results) {
            console.dir("res in db getabt"+results[0].abt);
            db.close();
            cb(results[0].abt);
        });



    });
}
function savefb(val) {
    console.log("in savefb");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection('mycollection3').insertOne(val,function () {
            console.log("item inserted for create evnt");
        })
        db.close();

    });
}





module.exports= {
    signup: signup,
    getid:getid,
    getpswrd:getpswrd,
    cre:cre,
    chkname:chkname,
    mycre:mycre,
    getabt:getabt,
    savefb:savefb,
}