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


const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



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


       /* var values ={
            id:req.body.id,
            brand: req.body.brand,
            name:req.body.name,
            view: req.body.view,



        };

        db.mobile(values,function(result) {
            res.send(result);
        })
        */
       res.send("submitted");
    }
)




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