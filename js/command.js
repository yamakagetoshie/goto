function onButtonClick() {
     var val = document.forms.form1.textBox1.value;
     var target = document.getElementById("output");

     if (val == "ワイン") {
         target.innerHTML = "正解です！<br>5秒後にページを移動します。";
//window.location.href = 'back/main_back.html';
setTimeout(function(){
  window.location.href = 'back/main_back.html';
}, 5*1000);
     } else {
         target.innerHTML = "間違っています。<br>再度お試しください。";           
     }
  }