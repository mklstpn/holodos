window.onload = function() {
var Icon_list = ['emoji/1.svg','emoji/2.svg','emoji/3.svg','emoji/4.svg','emoji/5.svg','emoji/6.svg','emoji/7.svg','emoji/8.svg','emoji/9.svg','emoji/10.svg',
'emoji/11.svg','emoji/12.svg','emoji/13.svg','emoji/14.svg','emoji/15.svg','emoji/16.svg','emoji/17.svg','emoji/18.svg','emoji/19.svg','emoji/20.svg',
'emoji/21.svg','emoji/22.svg','emoji/23.svg','emoji/24.svg','emoji/25.svg','emoji/26.svg','emoji/2.svg','emoji/28.svg','emoji/29.svg','emoji/30.svg',
'emoji/31.svg','emoji/32.svg','emoji/33.svg','emoji/34.svg','emoji/35.svg','emoji/36.svg','emoji/37.svg','emoji/38.svg','emoji/39.svg','emoji/40.svg',
'emoji/41.svg','emoji/42.svg','emoji/43.svg','emoji/44.svg','emoji/45.svg','emoji/46.svg','emoji/47.svg','emoji/48.svg','emoji/49.svg','emoji/50.svg',
'emoji/51.svg','emoji/52.svg','emoji/53.svg','emoji/54.svg','emoji/55.svg','emoji/56.svg','emoji/57.svg','emoji/58.svg','emoji/59.svg','emoji/60.svg',
'emoji/61.svg','emoji/62.svg','emoji/63.svg','emoji/64.svg','emoji/65.svg','emoji/66.svg','emoji/67.svg','emoji/68.svg','emoji/69.svg','emoji/70.svg',
'emoji/71.svg','emoji/72.svg','emoji/73.svg','emoji/74.svg','emoji/75.svg','emoji/76.svg','emoji/77.svg','emoji/78.svg','emoji/79.svg','emoji/80.svg',
'emoji/81.svg','emoji/82.svg','emoji/83.svg','emoji/84.svg','emoji/85.svg','emoji/86.svg','emoji/87.svg','emoji/88.svg','emoji/89.svg','emoji/90.svg',
'emoji/91.svg','emoji/92.svg',];
var slide1 = slide2 = slide3 = slide4 = "";
for (var i = 0; i < 21; i++) {
    slide1 = slide1 + " <button onclick='geticon(this)' class='button icon_button popover-close' value='" + Icon_list[i] + "'><img class='icon-img' src='"+ Icon_list[i] + "' /></button>";
}
for (var i = 22; i < 43; i++) {
    slide2 = slide2 + " <button onclick='geticon(this)' class='button icon_button popover-close' value='" + Icon_list[i] + "'><img class='icon-img' src='"+ Icon_list[i] + "' /></button>";
}
for (var i = 44; i < 65; i++) {
    slide3 = slide3 + " <button onclick='geticon(this)' class='button icon_button popover-close' value='" + Icon_list[i] + "'><img class='icon-img' src='"+ Icon_list[i] + "' /></button>";
}
for (var i = 66; i < 78; i++) {
    slide4 = slide4 + " <button onclick='geticon(this)' class='button icon_button popover-close' value='" + Icon_list[i] + "'><img class='icon-img' src='"+ Icon_list[i] + "' /></button>";
}

document.getElementById('slide1').innerHTML = slide1;
document.getElementById('slide2').innerHTML = slide2;
document.getElementById('slide3').innerHTML = slide3;
document.getElementById('slide4').innerHTML = slide4;
document.getElementById('buyslide1').innerHTML = slide1;
document.getElementById('buyslide2').innerHTML = slide2;
document.getElementById('buyslide3').innerHTML = slide3;
document.getElementById('buyslide4').innerHTML = slide4;
if (theme == 1) {
  console.log("Light there!");
    getLight();
} else {
  console.log("Dark is coming!..");
    getDark();
}
};

function geticon(objButton) {
document.getElementById('icon_input').value = objButton.value;
document.getElementById('buyicon_input').value = objButton.value;
};
