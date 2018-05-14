var AudioContext = AudioContext || webkitAudioContext;
var context = new AudioContext;
//加载媒体
var audio = new Audio("01.mp3");
//创建节点
var source = context.createMediaElementSource(audio);
var analyser = context.createAnalyser();
//连接：source → analyser → destination
source.connect(analyser);
analyser.connect(context.destination);

//检测分辨率，获得缩放比例
var screenHeight = document.body.clientHeight,
    screenWidth = document.body.clientWidth;

//Canvas初始化
var width = canvas.width,
    height = canvas.height;

var p = canvas.getContext("2d"),
    penBg = bg.getContext("2d");

analyser.fftSize = 4096;
var length = analyser.fftSize;
//创建数据
var dataArray = new Uint8Array(length);


audio.oncanplaythrough = function() {
    if(screenWidth!=width || screenHeight!=height){
        zoomPage();
    }
    fontCSSAnimation();
    audio.play();
};


//左边的填充渐变色
var gradient = p.createLinearGradient(0, 100, 480, 100);
gradient.addColorStop("0", "#5351e7");
gradient.addColorStop("1.0", "#2f98ce");

//右边的填充渐变色
var gradientRight = p.createLinearGradient(886, 100, 1366, 100);
gradientRight.addColorStop("0", "#0ee7f7");
gradientRight.addColorStop("1.0", "#2ce672");

function zoomPage(){
    var scaleX = (screenWidth/width).toPrecision(5),
        scaleY = (screenHeight/height).toPrecision(5);

    var style = document.createElement("style");
    document.head.appendChild(style);
    sheet = style.sheet;
    sheet.insertRule('body{transform-origin:0% 0%;transform:scale('+scaleX+','+scaleY+');}', 0);// 一个字符串,包含了要插入的样式规则(选择器和样式声明 index是一个数字,表示了要插入的位置.
    console.log('执行了zoom操作:',scaleX,scaleY)
}

function fontCSSAnimation() {
    //频谱动画开始
    document.body.style.background = '#000'
    setTimeout(function() {
        group.classList.add('hidden');
        setTimeout(draw, 300);   //DOM setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
    }, 4000);






    setTimeout(function() {
        canvas.style.opacity=0;
    }, 229500);

    //背景变黑，重播
    setTimeout(function() {
        document.body.style.backgroundColor = '#000';
        bg.style.opacity=0;
    }, 230000);

    setTimeout(function() {
        document.body.style.backgroundColor = '#fcfaff';
        replay.style.display ='block';
        replay.classList.remove('hidden');
    }, 235000);

    //辐射层透明，这样才能显示后面的频谱
    penBg.globalAlpha = 0.2;
}

function draw() {
    requestAnimationFrame(draw)
    analyser.getByteFrequencyData(dataArray);
    p.clearRect(0, 0, width, height);

    //放射性背景
    var gradientBg = penBg.createRadialGradient(width / 2, height / 2, height - Math.floor(Math.random() * 150 + 100), width / 2, height / 2, width / 2);
    gradientBg.addColorStop(0, "white");
    gradientBg.addColorStop(1, '#000');
    penBg.clearRect(0, 0, width, height);
    penBg.fillStyle = gradientBg;
    penBg.fillRect(0, 0, width, height);
    //左

    //左填充
    p.beginPath();
    p.moveTo(0, height - 200);
    var x = 0;
    for (var i = 1; i < 42; i++) {
        var lineHeight = dataArray[i] / 256 * height / 3;
        if (i < 5) {
            p.lineTo(x, height - dataArray[i] / 256 * height / 2 - 200)
        } else if (i > 40) {
            p.lineTo(x - 13, height - 200)
        } else {
            p.lineTo(x, height - lineHeight - 200)
        }
        x += 12;
    }
    p.fillStyle = gradient;
    p.fill();
    p.closePath();




    //左线条
    p.beginPath();
    p.moveTo(0, height - 200);
    var x = 0;
    for (var i = 1; i < 42; i++) {
        var lineHeight = dataArray[i] / 256 * height / 3;
        if (i < 5) {
            p.lineTo(x, height - dataArray[i] / 256 * height / 2 - 210 - Math.floor(Math.random() * 30))
        } else if (i > 40) {
            p.lineTo(x - 13, height - 220)
        } else {
            p.lineTo(x, height - lineHeight - 210 - Math.floor(Math.random() * 30))
        }
        x += 12;
    }
    p.strokeStyle = gradient;
    p.stroke();
    p.closePath();


    //清除左侧底部部分频谱
    p.fillStyle = '#000000';
    p.fillRect(0, height - 300, 470, 101); //绘制矩形

    //左倒影
    p.beginPath();
    p.moveTo(0, height - 299);
    var x = 0;
    for (var i = 1; i < 41; i++) {
        var lineHeight = dataArray[i] / 256 * height / 50;
        if (i < 5) {
            p.lineTo(x, dataArray[i] / 256 * height / 24 + 380)
        } else p.lineTo(x, lineHeight + 380)
        x += 12;
    }
    p.lineTo(x - 12, height - 299)
    p.fillStyle = '#21dd13';

    p.shadowBlur = 20;
    p.shadowColor = "#21dd13";
    p.fill();
    p.closePath();
    p.shadowBlur = 0;



    //右

    //右填充
    p.beginPath();
    p.fillStyle = gradientRight;
    p.moveTo(width, height - 200);
    var x = width;
    for (var i = 1; i < 42; i++) {
        var lineHeight = dataArray[i] / 256 * height / 3;
        if (i < 5) {
            p.lineTo(x, height - dataArray[i] / 256 * height / 2 - 200)
        } else if (i > 40) {
            p.lineTo(x + 12, height - 200)
        } else {
            p.lineTo(x, height - lineHeight - 200)
        }
        x -= 12;
    }
    p.fill();
    p.closePath();

    //右线条
    p.beginPath();
    p.moveTo(width, height - 200);
    var x = width;
    for (var i = 1; i < 42; i++) {
        var lineHeight = dataArray[i] / 256 * height / 3;
        if (i < 5) {
            p.lineTo(x, height - dataArray[i] / 256 * height / 2 - 210 - Math.floor(Math.random() * 30))
        } else if (i > 40) {
            p.lineTo(x + 12, height - 200)
        } else {
            p.lineTo(x, height - lineHeight - 210 - Math.floor(Math.random() * 30))
        }
        x -= 12;
    }
    p.strokeStyle = gradientRight;
    p.stroke();
    p.closePath();

    //清除右侧底部部分频谱
    p.fillStyle = '#000000';
    p.fillRect(width - 480, height - 300, 480, 100);


    //右倒影
    p.beginPath();
    p.moveTo(width, height - 299);
    var x = width;
    for (var i = 1; i < 41; i++) {
        var lineHeight = dataArray[i] / 256 * height / 50;
        if (i < 5) {
            p.lineTo(x, dataArray[i] / 256 * height / 24 + 380)
        } else p.lineTo(x, lineHeight + 380)
        x -= 12;
    }
    p.lineTo(x + 12, height - 299)
    p.fillStyle = '#21dd13';

    p.shadowBlur = 20;
    p.shadowColor = "#21dd13";
    p.fill();
    p.closePath();
    p.shadowBlur = 0;

}