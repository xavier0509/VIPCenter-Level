var numericalValue = 29000;   //成长值，当前用户的积分值
var rank = 15;             //等级，当前用户的等级
var integral          //计算出等级时，该等级对应的积分值 
var app = {

    canonical_uri:function(src, base_path) 
    {
        var root_page = /^[^?#]*\//.exec(location.href)[0],
        root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
        absolute_regex = /^\w+\:\/\//;
        // is `src` is protocol-relative (begins with // or ///), prepend protocol  
        if (/^\/\/\/?/.test(src)) 
        {  
        src = location.protocol + src; 
        }  
    // is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)  
        else if (!absolute_regex.test(src) && src.charAt(0) != "/")  
        {  
            // prepend `base_path`, if any  
            src = (base_path || "") + src; 
        }
    // make sure to return `src` as absolute  
        return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);  
    },
    
    rel_html_imgpath:function(iconurl)
    {
        console.log(app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1')));
        return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
    },


    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
      cordova.require("coocaa-plugin-coocaaosapi.coocaaosapi");
        app.receivedEvent('deviceready');
        app.triggleButton();
        coocaaosapi.getUserInfo(function(message) {
            avatar = message.avatar;
            console.log("url:"+avatar);
            document.getElementById("headImg").src=avatar;
        },function(error) { console.log(error);});

    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelectorAll('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        for( var i = 0 , j = receivedElement.length ; i < j ; i++ ){
            receivedElement[i].setAttribute('style', 'display:block;');
        }
      /*receivedElement.setAttribute('style', 'display:block;');*/
        document.getElementById('lowvalue').innerHTML=numericalValue;
        document.getElementById('nameCount').innerHTML=rank;
        console.log('Received Event: ' + id);
        if (rank<4) {
          document.getElementById('main1').style.display="block";
          document.getElementById("main2").style.display="none";
        }
        else{
          document.getElementById('main2').style.display="block";
          document.getElementById("main1").style.display="none";
          document.getElementById("levelstar2-11").innerHTML="Lv"+(rank-2);
          document.getElementById("levelstar2-22").innerHTML="Lv"+(rank-1);
          document.getElementById("levelstar2-33").innerHTML="Lv"+rank;
          document.getElementById("levelstar2-44").innerHTML="Lv"+(rank+1);
          document.getElementById("levelstar2-55").innerHTML="Lv"+(rank+2);
          document.getElementById("levelstar2-66").innerHTML="Lv"+(rank+3);
          document.getElementById("levelstar2-111").innerHTML=((rank-2)*(rank-2)+4*(rank-2)-5)*100;
          document.getElementById("levelstar2-222").innerHTML=((rank-1)*(rank-1)+4*(rank-1)-5)*100;
          document.getElementById("levelstar2-333").innerHTML=(rank*rank+4*rank-5)*100;
          document.getElementById("levelstar2-444").innerHTML=((rank+1)*(rank+1)+4*(rank+1)-5)*100;
          document.getElementById("levelstar2-555").innerHTML=((rank+2)*(rank+2)+4*(rank+2)-5)*100;
          document.getElementById("levelstar2-666").innerHTML=((rank+3)*(rank+3)+4*(rank+3)-5)*100;
        }
        showStar();
    },
    triggleButton:function(){
        cordova.require("coocaa-plugin-coocaaosapi.coocaaosapi");
        
    }
};

app.initialize();

function showStar(){
  var starDiv = document.getElementById("star"); //徽章div
  var Gold = null;//金牌数量
  var Argentum = null;//银牌数量
  var Cuprum = null;//铜牌数量
  var sum = null;//徽章总数
  Gold = parseInt(rank/16);
  Argentum = parseInt((rank%16)/4);
  Cuprum = (rank%16)%4;
  sum = Gold + Argentum + Cuprum;
  console.log("金牌：" + Gold +"银牌：" + Argentum +"铜牌：" + Cuprum + "总数：" + sum);
  for (var i = 0; i < Gold; i++) {
    var img = document.createElement("img");
    img.setAttribute("src",app.rel_html_imgpath(__uri("../img/jin.png")));
    starDiv.appendChild(img);
  }
  for (var i = 0; i < Argentum; i++) {
    var img = document.createElement("img");
    img.setAttribute("src",app.rel_html_imgpath(__uri("../img/yin.png")));
    starDiv.appendChild(img);
  }
  for (var i = 0; i < Cuprum; i++) {
    var img = document.createElement("img");
    img.setAttribute("src",app.rel_html_imgpath(__uri("../img/tong.png")));
    starDiv.appendChild(img);
  }
  if (rank>3) {
    console.log("startChangeTheWidthOfRank----------")
    var beforeV = (rank*rank+4*rank-5)*100;
    var afterV = ((rank+1)*(rank+1)+4*(rank+1)-5)*100;
    var width = ((numericalValue - beforeV) / (afterV - beforeV))*14.6;//等级大于3的情况下进度长度
    var planeWidth = 34+width;
    console.log("beforeV:"+beforeV+"afterV:"+afterV+"width:"+width);
    document.getElementById("level2-3").style.width = width+"%";
    document.getElementById("plane").style.left = planeWidth +"%";
  }else{
    if (rank==1) {
      document.getElementById("level2").style.width ="0%";
      document.getElementById("level3").style.width ="0%";
      var width = ((numericalValue) / (700))*9.5;
      var planeWidth = 9.5+width-2;
      document.getElementById("level1").style.width =width+"%";
      document.getElementById("plane").style.left = planeWidth +"%";
    }
    else if(rank==2){
      document.getElementById("level1").style.width ="9.5%";
      document.getElementById("level3").style.width ="0%";
      var width = ((numericalValue - 700) / (1600 - 700))*15;
      console.log("width:"+width);
      var planeWidth = 19.5+width-2.5;
      document.getElementById("level2").style.width =width+"%";
      document.getElementById("plane").style.left = planeWidth +"%";
    }
    else if(rank==3){
      document.getElementById("level1").style.width ="9.5%";
      document.getElementById("level2").style.width ="15%";
      var width = ((numericalValue - 1600) / (2700 - 1600))*15.6;
      var planeWidth = 33.5+width-2;
      document.getElementById("level3").style.width =width+"%";
      document.getElementById("plane").style.left = planeWidth +"%";
    }
  }
}