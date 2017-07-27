/**
 * Created by pujasvi on 7/24/17.
 */
var express = require('express');
var app = express();

var path=require('path');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');


app.use('/',express.static('./public_html'));
const md5=require('md5');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const db=require('./db.js')


app.listen(3800,function(){
    console.log("server running on port 3800");
})




app.post('/getcity',function(req,res){

 /*   db.events_id_find(function (result) {

            console.log(result[0]);

            res.send(result);
        }
    )
*/

    arr=[];
    arr2=[];
    arr3=[];
    arr4=[];
    arr5=[];
    var countryname=req.body.city;
    console.log(" city name is "+countryname);
    var url="https://www.everfest.com/find"+"??utf8=%E2%9C%93&q=&starts_on=&ends_on=&location="+countryname;

    request(url,function(err,resp,body){
                var $=cheerio.load(body);



                $('.festival-card__title').each(function () {
                    var itemname=$(this).text();
                    arr.push(itemname);
                });
                $('.festival-card__date').each(function () {
                    var itemname=$(this).text();
                    arr2.push(itemname);
                });
                $('.festival-card__location').each(function () {
                    var itemname=$(this).text();
                    arr3.push(itemname);
                });

                urls=[];

                $('.festival-card__img').each(function(){

                    var url = $(this).attr('data-original');
                    urls.push(url);
                });

        $('.js-festival-fav-unfav-container').each(function () {

            var a = $(this).next();
            var url =a.attr('href');
           // console.log(url);
            arr5.push('https://www.everfest.com'+url);
        });

        for(var i=0;i<arr.length;i++){
            arr4.push({item1:arr[i],
                item2:arr2[i],
                item3:arr3[i],
                item4:urls[i],
                item5:arr5[i],
            })

            console.log(i+1+'  '+arr[i]+' '+arr2[i]+'  '+arr3[i]+arr5[i]+"  url is  "+urls[i]);
        }

        res.send(arr4);

    });






})



app.post('/signup',function(req,res) {

        console.log("signup in server " +req.body.name+req.body.email+req.body.city,req.body.mob+req.body.sex,req.body.pswrd);

var id_my;
        db.getid(function (result) {
          id_my=parseInt(result[0].id);

            console.log(typeof(id_my) +"hi id"+result[0].id);
            var values ={
                id:id_my+1,
                name:req.body.name,
                email: req.body.email,
                city:req.body.city,
                mob: req.body.mob,
                sex:req.body.sex,
                pswrd:md5(req.body.pswrd),



            };

            db.signup(values,function(result) {
                res.send(result);
            })

            res.send("submitted");
        })
        })



app.post('/chkname',function(req,res) {

    var val = req.body.name;
    console.log("chkname in server " + req.body.name );
    db.chkname(val, function (result) {
        console.log("internl"+result.length);


        if(result.length==0)
        res.send("unique");

        else{
            res.send("notu");
        }

    })
}  )




app.post('/login',function(req,res) {

    var val = req.body.name;
    console.log("login in server " + req.body.name + md5(req.body.pswrd));
    db.getpswrd(val, function (result) {
        console.log(result);
        if(md5(req.body.pswrd)==result[0].pswrd){
            res.send("correct");
        }
        else{
            res.send("incorrect");
        }


    })
}  )
    //})

    /*db.getid(function (result) {
        id_my=parseInt(result[0].id);

        console.log(typeof(id_my) +"hi id"+result[0].id);
        var values ={
            id:id_my+1,
            name:req.body.name,
            email: req.body.email,
            city:req.body.city,
            mob: req.body.mob,
            sex:req.body.sex,
            pswrd:md5(req.body.pswrd),



        };

        db.signup(values,function(result) {
            res.send(result);
        })

        res.send("submitted");
    })
    */

//})








/*
app.post('/getinfo',function(req,res){



    arr=[];
    arr2=[];
    arr3=[];
    arr4=[];

    var url="https://www.everfest.com/e/hanuman-jayanti-hyderabad-india";
    console.log(" link is"+url);

    request(url,function(err,resp,body){
        var $=cheerio.load(body);



       //console.log($(".read-more-text__body").text());

b=$(".read-more-text__body").text();

      for(var i=0;i<arr.length;i++){
            arr4.push({item1:arr[i],
                item2:arr2[i],
                item3:arr3[i],
                item4:urls[i],
                item5:arr5[i],
            })

           console.log(i+1+'  '+arr[i]+' '+arr2[i]+'  '+arr3[i]+arr5[i]+"  url is  "+urls[i]);

       }

    console.log(b);
        res.send(b);

    });


})

*/