/**
 * Created by pujasvi on 7/24/17.
 */
var express = require('express');
var app = express();

var path=require('path');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');


var cloudinary = require('cloudinary');



cloudinary.config({
    cloud_name: 'dr2p7rxs7',
    api_key: '653217717858436',
    api_secret: 'YShS2-7y-7bClMFrG_QtiSwm5tI'
});



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

app.listen(process.env.PORT || 4700, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});





app.post('/getcity',function(req,res){

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
                item6:null
            })

            console.log(i+1+'  '+arr[i]+' '+arr2[i]+'  '+arr3[i]+arr5[i]+"  url is  "+urls[i]);
        }


        db.mycre(countryname, function (result) {
           // console.log("internl of mycre server"+result.abt);
            for(var i=0;i<result.length;i++) {
                arr4.push({
                    item1: result[i].name,
                    item2: result[i].date,
                    item3: result[i].city + result[i].add,
                    item4: result[i].link,
                    item5: "./index3.html",
                    item6:result[i].abt,
                })
            }

            res.send(arr4);
        })





    });






})

var host1=process.env.PORT,rand;
var HelperOptions;
var values1;
app.post('/signup',function(req,res) {

        console.log("signup in server " +req.body.name+req.body.email+req.body.city,req.body.mob+req.body.sex,req.body.pswrd);



    rand=Math.floor((Math.random() * 100) + 54);
    link="http://"+"pujasvir.herokuapp.com"+"/verify?id="+rand;



     HelperOptions={
        from:'pujasvi <doordiedoordie6@gmail.com>',
        to:req.body.email,
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
console.log("pass in signup is"+md5(req.body.pswrd));
        db.getid(function (result) {
            if(result.length!=0)
          id_my=parseInt(result[0].id);

            else{
                id_my=0;
            }
            //console.log(typeof(id_my) +"hi id"+result[0].id);
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
    //if((req.protocol+"://"+req.get('host'))==("http://"+host1))
    //{
      //  console.log("Domain is matched. Information is from Authentic email");
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
    //}
    /*else
    {
        res.end("<h1>Request is from unknown source");
    }*/
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



app.post('/getabt',function(req,res) {

    var city = req.body.cityname;
    var eve=req.body.evntname;

var val={
    city:req.body.cityname,
    eve:req.body.evntname,
}


    console.log("getabt  in server " + city+eve);
    db.getabt(val, function (result) {


   res.send(result);

    })
}  )




app.post('/savefb',function(req,res) {


    var val={
        a:req.body.a,
        b:req.body.b,
        c:req.body.c,
    }


    console.log("savefb  in server "+req.body.a+req.body.b+req.body.c);

    db.savefb(val);

    res.send("success");
}  )


app.post('/cre',function(req,res) {
var values;
    cloudinary.uploader.upload(req.body.im, function (result) {
        console.log(result);
        console.log("puublic is" + result.url);
        im = result.url;


        console.log("create server " + req.body.im);
        values = {

            name: req.body.name,

            city: req.body.city,
            add: req.body.add,
            date: req.body.date,
            link: im,
            abt: req.body.abt,

        };
        db.cre(values,function (result) {

            res.send("submitted");
        })

    })




}  )



app.post('/login',function(req,res) {

    var val = req.body.name;
    console.log("login in server " + req.body.name + md5(req.body.pswrd));
    db.getpswrd(val, function (result) {
        console.log("login res is"+result.length);
        if(result.length!=0) {
            if (md5(req.body.pswrd) == result[0].pswrd) {
                res.send("correct");
            }

            else {
                console.log("enter here in else");
                res.send("incorrect");
            }
        }
        else{
            console.log("enter here in else");
            res.send("incorrect");
        }

    })
}  )
