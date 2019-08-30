function showCheck(a){
	var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
	ctx.clearRect(0,0,1000,1000);
	ctx.font = "80px 'Microsoft Yahei'";
	ctx.fillText(a,0,100);
	ctx.fillStyle = "white";
}
var code ;    
function createCode(){       
    code = "";      
    var codeLength = 4;
    var selectChar = new Array(1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');      
    for(var i=0;i<codeLength;i++) {
       var charIndex = Math.floor(Math.random()*60);      
      code +=selectChar[charIndex];
    }      
    if(code.length != codeLength){      
      createCode();      
    }
    showCheck(code);
}
          
function validate () {
    var inputCode = document.getElementById("J_codetext").value.toUpperCase();
    var codeToUp=code.toUpperCase();
    if(inputCode.length <=0) {
      document.getElementById("J_codetext").setAttribute("placeholder","输入验证码");
      createCode();
      return false;
    }
    else if(inputCode != codeToUp ){
      document.getElementById("J_codetext").value="";
      document.getElementById("J_codetext").setAttribute("placeholder","验证码错误");
      createCode();
      return false;
    }
    else {
      window.open(document.getElementById("J_down").getAttribute("data-link"));
      document.getElementById("J_codetext").value="";
      createCode();
      return true;
    }

}



function dojson() {
 var obj={
    "sites": {
      "site": [
        {
          "user": "admin",
          "pwd": "123456"
        },
        {
          "user": "user",
          "pwd": "1234"
        },
        {
          "user": "root",
          "pwd": "123"
        }
      ]
    }
  };
  var myobj = obj;
  var user = document.getElementById("user").value;
  var pwd = document.getElementById("pwd").value;
  var inputCode = document.getElementById("J_codetext").value.toUpperCase();
  var codeToUp = code.toUpperCase();
  var is = false;
  if (user.length > 0 && pwd.length > 0 && inputCode.length > 0) {
    for (var i = 0; i < obj.sites.site.length; i++) {
      if (user == myobj.sites.site[i].user && pwd == myobj.sites.site[i].pwd) {
        is = true;
        break;
      }
    }
    if (is == true && inputCode == codeToUp) {
      alert("登陆成功!");
      location.href = "index.html";
    } else if (inputCode != codeToUp) {
      alert("验证码错误,请重新输入!");
      document.getElementById("J_codetext").value = "";
    } else {
      alert("用户名或密码错误!");
    }

  } else if (user.length <= 0) {
    alert("请输入用户名！");
  } else if (pwd.length <= 0) {
    alert("请输入密码!");
  } else {
    alert("请输入验证码!");
  }
}

function doSend(){
  $.post("http://192.168.6.97:8080/myth/login",{'un':document.getElementById("user").value,'pd':document.getElementById("pwd").value},function(response,status,xhr){
        alert("服务器已响应"+response);
      
  })
}