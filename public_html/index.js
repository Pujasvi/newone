/**
 * Created by pujasvi on 7/22/17.
 */
window.onload=function () {
    alert("index loaded");
    document.getElementById('dest').innerHTML=localStorage.getItem('city');
    var ob=localStorage.getItem('data');
    var ob2=JSON.parse(ob);
    //console.log(ob2[0].item1);
    for(var row in ob2) {
   /*     $.post('/getinfo', {
                link:ob2[row].item5,

            },
            function (data, status) {
                console.log("getinfo working" + status+data);
                //localStorage.setItem('info',JSON.stringify(data));

                for(var item in data){
                    item++;
                }
                console.log(item);



            })


*/
        document.getElementById('dest2').innerHTML +='<div style="margin-left: 50px;height:300px;width: 200px;text-wrap: normal" id=" '+row+' " " >'+'<a href="'+ob2[row].item5+'">'+'<img src="' + ob2[row].item4+'"+ height="200px" width="200px" >'+'<br>'+'<span style="color:blue">'+ob2[row].item1+'</span>'+'</a>'+'<br>'+ ob2[row].item2+'<br>'+ob2[row].item3+'</div>'+'<br>';


        //document.getElementById('dest2').innerHTML +='<div style="height:200px;width:200px;"+ id=" '+row+' " ">'+ob2[row].item1+ ob2[row].item2+ob2[row].item3+ob2[row].item4+'</div>'+'<br>';

    }
    //document.getElementById('dest2').innerHTML='<div style="background-image: url("'+ob2[0].item4+' ")">'+hello +'</div>';

    document.lgform.reset();
    document.spform.reset();
//alert(localStorage.getItem('stat'));

    if(localStorage.getItem('stat')=='logged in'){
        document.getElementById('wlcm_msg').innerHTML+=localStorage.getItem('user')+'<br>'+'<button id="log" style="height:30px;width:80px;background-color:gainsboro;color: black" onclick="logout()">LOGOUT</button>';
        $("#login").css({"backgroundColor": "gray"});
        $("#signup").css({"backgroundColor": "gray"});
    }

}
$(document).ready(function () {


}
)


logout=function () {
    localStorage.setItem('stat','logged out');
    $("#login").css({"backgroundColor": "white"});

    $("#signup").css({"backgroundColor": "white"});
    document.getElementById('wlcm_msg').innerHTML='HELLO';
    $('#log').hide();

}


sp=function(){
    if(localStorage.getItem('stat')!='logged in') {
        document.spform.reset();
        $("#ovrlay").show();
        $("#modal-box").show("slow");

        var modal1 = document.getElementById('ovrlay');

        window.onclick = function (event) {


            if (event.target == modal1) {
                //alert("hello");

                modal1.style.display = "none";
                $("#modal-box").hide();
                $("#msg").hide();
                document.spform.reset();
            }
        }
    }


}

sp_cls=function () {
    $('#msg').hide();
    $("#ovrlay").hide();
    $("#modal-box").hide();
    $("#msg").hide();
    document.spform.reset();
}





sub1=function(){

    var name=$('#name').val();
    var em=$('#em').val();
    var cty=$('#cty').val();
    var  mb=$('#mb').val();
    var sex;
    var radios = document.getElementsByName('gender');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            sex=radios[i].value;

            // only one radio can be logically checked, don't check the rest

        }
    }
    var gndr;
if(sex==1)
    gndr="male";
    else{
        gndr="female";
}

    var pswd=$('#pswd').val();
    var pswd1=$('#pswd1').val();


    console.log("submitted enter");


        if(pswd!=pswd1){
            $('#msg').show();
            document.getElementById('msg').innerHTML="pswrd did not match";
            $('#pswd').val('');
            $('#pswd1').val('');
        }
    else {
            console.log("signup inside");
            $.post('/signup', {
                    name:name,
                    email:em,
                    city:cty,
                    mob: mb,
                    sex:gndr,
                    pswrd:pswd,

                },
                function (data, status) {
                    console.log("/sign up working" + status);
                    alert("signup succesfully");

                })



            document.spform.reset();
            $("#msg").hide();
            //alert("signed up succesfully");
            $("#ovrlay").hide();
            $("#modal-box").hide();
        }


}


var stat="logged out";

lg=function(){

if(localStorage.getItem('stat')!='logged in') {
    $("#ovrlay").show();
    $("#modal-box2").show("slow");

    var modal1 = document.getElementById('ovrlay');

    window.onclick = function (event) {


        if (event.target == modal1) {
            //alert("hello");

            modal1.style.display = "none";
            $("#modal-box2").hide();
            $("#status2").hide();
            document.lgform.reset();
        }
    }
}
else{

    $("#login").css({"backgroundColor": "gray"});

}


}


lg_cls=function () {

    $("#ovrlay").hide();
    $("#modal-box2").hide();
    $("#status2").hide();
    document.lgform.reset();

}
sub2=function () {
var a=$('#name2').val();
var b=$('#pswd2').val();
localStorage.setItem('user',a);

if(b=='123'){
alert("logged in");
document.getElementById('wlcm_msg').innerHTML+=localStorage.getItem('user')+'<br>'+'<button id="log" style="height:30px;width:80px;background-color:gainsboro;color: black" onclick="logout()">LOGOUT</button>' ;
    $("#ovrlay").hide();
    $("#modal-box2").hide();
    $("#status2").hide();
  stat="logged in";
    $("#login").css({"backgroundColor": "gray"});
    $("#signup").css({"backgroundColor": "gray"});
  localStorage.setItem('stat',stat);
    document.lgform.reset();
    $('#status3').hide();
    document.getElementById('crsub').disabled=false;

}
else{
    $('#status2').show();
    document.getElementById('status2').innerHTML="wrong paswrd";

}

}






cr_cls=function () {
 //   $('#msg').hide();
    $("#ovrlay").hide();
    $("#modal-box3").hide();
   // $("#msg").hide();
    document.crform.reset();
}





cr=function(){

    if(localStorage.getItem('stat')!='logged in'){

        document.getElementById('status3').innerHTML="log in first";
        document.getElementById('crsub').disabled=true;
    }

        document.crform.reset();
        $("#ovrlay").show();
        $("#modal-box3").show("slow");

        var modal1 = document.getElementById('ovrlay');

        window.onclick = function (event) {


            if (event.target == modal1) {
                //alert("hello");

                modal1.style.display = "none";
                $("#modal-box3").hide();
                //$("#msg3").hide();
                document.crform.reset();
            }
        }



}
sub3=function () {

    var name=$('#ename').val();
    var city=$('#city').val();
    var add=$('#add').val();

    var  date=$('#datepicker').val();
    var date1=date.slice(0,2);
    var date2=date.slice(3,5);
    var date3=date.slice(6,10);

    var charges=$('#chg').val();

    console.log("submitted enter create");



        document.crform.reset();

        alert("created succesfully  ");
        $("#ovrlay").hide();
        $("#modal-box3").hide();




}





vw=function () {
    var a=$('#cityname').val();

    localStorage.setItem('city',a);
    $.post('/getcity', {
            city:a,

        },
        function (data, status) {
            console.log("/view working" + status+data[0].item1);
            localStorage.setItem('data',JSON.stringify(data));

            for(var item in data){
                item++;
            }
console.log(item);
           window.location = "index2.html";

        })



 alert(a);
}