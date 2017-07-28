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


const nodemailer=require('nodemailer');

var transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'doordiedoordie6@gmail.com', //email address to send from
        pass: 'Pujasvi@123' //the actual password for that account
    }
});


app.listen(4000,function(){
    console.log("server running on port 4000");
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

var host="localhost:4000",rand;
var HelperOptions;
var values1;
app.post('/signup',function(req,res) {

        console.log("signup in server " +req.body.name+req.body.email+req.body.city,req.body.mob+req.body.sex,req.body.pswrd);



    rand=Math.floor((Math.random() * 100) + 54);
    link="http://"+host+"/verify?id="+rand;



     HelperOptions={
        from:'pujasvi <doordiedoordie6@gmail.com>',
        to:'pujasvirakheja1@gmail.com',
        subject: "Please confirm your Email account "+req.body.name,
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"


    };

    transporter.sendMail(HelperOptions,function(err,info){
        if(err){
            console.log(err);
        }
        console.log(" the msg has sent");
        console.log(info);
    });

var id_my;
        db.getid(function (result) {
          id_my=parseInt(result[0].id);

            console.log(typeof(id_my) +"hi id"+result[0].id);
             values1 ={
                id:id_my+1,
                name:req.body.name,
                email: req.body.email,
                city:req.body.city,
                mob: req.body.mob,
                sex:req.body.sex,
                pswrd:md5(req.body.pswrd),



            };


            res.send("submitted");
        })
        })

app.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.end("<h1>Email "+HelperOptions.to+" is been Successfully verified");
            db.signup(values1,function(result) {
                res.send(result);
            })

        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});




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