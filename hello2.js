var express=require('express');
var path=require('path');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var app=express();

var port=8004;



 arr=[];
 arr2=[];
 arr3=[];
var destination=fs.createWriteStream('./downloads/google.html');




/*countries=['india','new york'];
var find=1;
*/




//var url;

/*switch (find){
    case 1:  url="https://www.everfest.com/find?utf8=%E2%9C%93&q=&starts_on=&ends_on=&location=India&latitude=20.593684&longitude=78.96288000000004&button=&radius=5&sort=sort_by_relevance";
                    break;
    case 2: url="https://www.everfest.com/find?utf8=%E2%9C%93&q=&starts_on=&ends_on=&location=New+York%2C+NY%2C+United+States&latitude=&longitude=&button=&radius=5&sort=sort_by_relevance"
        break;
    default: url="https://www.everfest.com/find";
}
*/

var countryname='INDIA';
var url="https://www.everfest.com/e/hanuman-jayanti-hyderabad-india";
    //https://www.everfest.com/find
request(url,function(err,resp,body){
    var $=cheerio.load(body);
    //console.log("para is"+$(".read-more-text-mobile").html());
/*$('.read-more-text__body').each(function (i,element) {
    var node=$(this);
    var text=node.text();
    console.log("text is"+text);
})

*/
    $('.read-more-text-mobile').each(function () {
       var  text=$(this).text();
        console.log("text is"+text);
    })





}).pipe(destination);






        app.listen(port);
console.log('server is listening');
/**
 * Created by pujasvi on 7/24/17.
 */
