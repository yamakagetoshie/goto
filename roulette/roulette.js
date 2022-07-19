const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d');


var center = {
    x: 300,	//元は150
    y: 300
}

var radius = 200	//元は100

var data = [{
    name: "ルーローファン",
    text: "ルーローファンルーローファンルーローファンルーローファンルーローファンルーローファンルーローファン",
    target: "../image/24432513L.jpg",
    color: '#93FFAB',
    weight: 1
},
{
    name: "水餃子",
    text: "水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子水餃子",
    target: "../image/2896119L.jpg",
    color: '#E4FF8D',
    weight: 1
},
{
    name: "カキオムレツ",
    text: "カキオムレツカキオムレツカキオムレツカキオムレツカキオムレツカキオムレツカキオムレツカキオムレツカキオムレツカキオムレツカキオムレツ",
    target: "https://placehold.jp/14f0ec/ffffff/1000x667.png",
    color: '#8EF1FF',
    weight: 1
},
{
    name: "大きいカラアゲ",
    text: "大きいカラアゲ大きいカラアゲ大きいカラアゲ大きいカラアゲ大きいカラアゲ",
    target: "../image/23010763L.jpg",
    color: '#C299FF',
    weight: 1
},
{
    name: "季節の野菜炒め",
    text: "季節の野菜炒め季節の野菜炒め季節の野菜炒め季節の野菜炒め季節の野菜炒め季節の野菜炒め季節の野菜炒め",
    target: "../image/4797852L.jpg",
    color: '#FF97C2',
    weight: 1
},
{
    name: "台湾ソーセージ",
    text: "台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ台湾ソーセージ",
    target: "https://placehold.jp/f32812/ffffff/1000x667.png",
    color: '#FF9872',
    weight: 1
}

]

var sum_weight = 0
var unit_weight = 0
var stopFlag = false;
var startFlag = false;

//
// メイン処理
//
data.forEach(e => {
    sum_weight += e.weight
})
unit_weight = 360 / sum_weight

init()


drawRoullet(0)


function drawRoullet(offset) {
    var uw_count = offset

    data.forEach(e => {
        drawPie(center.x, center.y, uw_count, uw_count + unit_weight, radius, e.color)
        uw_count += unit_weight
    })


}


function startRoullet() {
    var count = 1; //終了までのカウント
    var lastCell = "";
    var deg_counter = 0 // 角度のカウント
    var acceleration = 1

    var timer = setInterval(function () {

        deg_counter += acceleration

        if (stopFlag) {
            count++;
        }

        if (count < 500) {
            acceleration = 500 / (count)
            drawRoullet(deg_counter);
        } else {
            count = 0;
            clearInterval(timer);
            endEvent();
        }
    }, 10);

    var endEvent = function () {
        count++;
        var id = setTimeout(endEvent, 115);
        if (count > 9) {
            clearTimeout(id);
            startFlag = false;
            stopFlag = false;
            var current_deg = 360 - Math.ceil((deg_counter - 90) % 360)
            var sum = 0
            var _i = 0
            for (var i = 0; i < data.length; i++) {
                if (unit_weight * sum < current_deg && current_deg < unit_weight * (sum + data[i].weight)) {
                    document.getElementById("debug").innerHTML = data[i].name + "です"
                    detail.innerText = "CLICK>";  //<a>タグに「詳細」と表示させる
                    menu_title.innerText = data[i].name;
                    menu_img.src = data[i].target;
                    menu_text.innerText = data[i].text;
                    break
                }
                sum += data[i].weight
            }
        }
    };
}

const start = document.getElementById('start');
start.onclick = () => {

    start.disabled = true;	//ボタンの2度押し防止

    if (startFlag === false) {
        startRoullet();
        startFlag = true;
    } else {
        startFlag = false;
    }


}

const stop = document.getElementById('stop');
stop.onclick = () => {

    stop.disabled = true;	//ボタンの2度押し防止

    if (startFlag) {
        stopFlag = true;
    }

}

//結果のリセット
const resetElement = document.getElementById('detail');
detail.onclick = () => {
    detail.innerText = "";
    debug.innerHTML = "";

    start.disabled = false;	//処理が完了したらボタンを活性状態に戻す
    stop.disabled = false;
}

function init() {
    canvas.width = 600;	//元は300
    canvas.height = 600;

    var dst = context.createImageData(canvas.width, canvas.height);
    for (var i = 0; i < dst.data.length; i++) {
        dst.data[i] = 0 //元は255
    }
    context.putImageData(dst, 0, 0);
}

function drawPie(cx, cy, start_deg, end_deg, radius, color) {
    var _start_deg = (360 - start_deg) * Math.PI / 180;
    var _end_deg = (360 - end_deg) * Math.PI / 180;

    context.beginPath();
    context.moveTo(cx, cy)
    context.fillStyle = color;
    context.arc(cx, cy, radius, _start_deg, _end_deg, true);
    context.fill();

    showArrow()
}

function showArrow() {
    context.beginPath();
    context.moveTo(center.x, center.y - radius);
    context.lineTo(center.x + 10, center.y - radius - 10);
    context.lineTo(center.x - 10, center.y - radius - 10);
    context.closePath();
    context.stroke();
    context.fillStyle = "rgba(255,255,255)";	//元はrgba(40,40,40)
    context.fill();
}











