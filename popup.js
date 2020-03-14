function downloadURI(uri, name) {
    console.log(uri);
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }
window.onload = function () {
    var query = { active: true, currentWindow: true };

    document.getElementById("urlInput").addEventListener("change",function(){
        generateQRCode(this.value);
    });
    document.getElementById("urlInput").addEventListener("input",function(){
        generateQRCode(this.value);
    });
    document.getElementById("downloadBtn").addEventListener("click",function(){
        downloadURI( document.getElementsByTagName("canvas")[0].toDataURL("image/png"),"QRCode.png");
    });
    function callback(url) {
        document.getElementById("urlInput").textContent=(url);
        generateQRCode(url);
    }
    document.getElementsByClassName("rating")[0].onclick = function () {
        window.open("https://chrome.google.com/webstore/detail/qr-code-generator/aoomhecnemapdfegmfeeljedkclnggnm/reviews");
    };
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        callback(tabs[0].url)
    });
}

var qrcode;
let options  = {
    render		: "canvas",
    width		: 256,
    height		: 256,
    typeNumber	: -1,
    correctLevel	: 'H',
    background      : "#ffffff",
    foreground      : "#000000"
};
var createCanvas	= function(text){
    // create the qrcode itself
    var typeNumber = 0;
    var errorCorrectionLevel = 'H';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();

    // create canvas element
    var canvas	= document.createElement('canvas');
    canvas.width	= options.width;
    canvas.height	= options.height;
    var ctx		= canvas.getContext('2d');

    // compute tileW/tileH based on options.width/options.height
    var tileW	= options.width  / qr.getModuleCount();
    var tileH	= options.height / qr.getModuleCount();

    // draw in the canvas
    for( var row = 0; row < qr.getModuleCount(); row++ ){
        for( var col = 0; col < qr.getModuleCount(); col++ ){
            ctx.fillStyle = qr.isDark(row, col) ? options.foreground : options.background;
            var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
            var h = (Math.ceil((row+1)*tileH) - Math.floor(row*tileH));
            ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
        }	
    }
    // return just built canvas
    return canvas;
}
function generateQRCode(url){
    let node = document.getElementById("qrcode-container");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
      }

    document.getElementById('qrcode-container').append(createCanvas(url));
}

