let selList = document.querySelectorAll(".startSel li");
let startSel = document.querySelector(".startSel");
let draw = document.querySelector(".draw");
let count = 0;
let boxX = 0;
let boxY = 0;
let rest = 0
let timeNum = 0;
let flag = true;
let trueNum = 0;
let time = "";
mask();
selList.forEach(function(val, index) {
	val.onclick = function() {
		if(!sessionStorage.maskFlag){
			myAlert("还想偷鸡");
			mask();
		}
		count = (index+1)*10;
		rest = count;
		document.querySelector(".count span").innerText = count;
		document.querySelector(".rest span").innerText = count;
		if(index == 0) {
			boxX = 8;
			boxY = 8;
		} else if(index == 1) {
			boxX = 12;
			boxY = 12;
		} else {
			boxX = 15;
			boxY = 15;
		}
		init();
		startSel.style.display = "none";
	}
});

function init() {
	draw.style.display = "block";
	let widths = draw.offsetWidth;
	let heights = draw.offsetHeight;
	let width = widths / boxX;
	let height = heights / boxY;
	for(let i = 0; i < boxX; i++) {
		for(let j = 0; j < boxY; j++) {
			let div = document.createElement("div");
			div.id = `a-${i}-${j}`;;
			div.className = "block";
			div.style.cssText = `width: ${width}px;height: ${height}px;);`;
			div.style.backgroundImage = "url(img/blank.png)";
			div.style.backgroundPosition = "center";
			div.style.backgroundSize = "100% 100%";
			draw.appendChild(div);
		}
	}
	let block = document.querySelectorAll(".block");

	while(document.querySelectorAll(".lie").length < count) {
		let index = getRandom(0, block.length - 1);
		if(!(document.querySelectorAll(".block")[index].classList.contains("lie"))) {
			block[index].classList.add("lie");
		}
	}
	draw.oncontextmenu = function(e) {
		if(!(e.target.classList.contains("block"))){
			return;
		}
		e.preventDefault();
		clickRight(e.target);
	}
	draw.onclick = function(e) {
		if(!(e.target.classList.contains("block"))){
			return;
		}
		clickLeft(e.target);
		if(trueNum == count || ((boxX * boxY - document.querySelectorAll(".number").length) == count)) {
			myAlert("胜利", 3000);
			clearInterval(time);
			location.reload();
		}
	}
}

function clickLeft(ele) {
	setTime();
	if(ele.classList.contains("flag") || ele.classList.contains("number")) {
		return;
	}
	let id = ele.id;
	let arr = id.split("-");
	let x = arr[1];
	let y = arr[2];
	if(ele.classList.contains("lie")) {
		let lieAll = document.querySelectorAll(".lie");
		lieAll.forEach(function(val) {
			val.style.backgroundImage = "url(img/blood.bmp)";
		});
		myAlert("游戏失败!", 3000);
		clearInterval(time);
		location.reload();
		return;
	}
	let num = 0;
	for(var i = x - 1; i <= x * 1 + 1; i++) {
		for(let j = y - 1; j <= y * 1 + 1; j++) {
			let box = document.querySelector(`#a-${i}-${j}`);
			if(box && box.classList.contains("lie")) {
				num++;
			}
		};

	}

	ele.style.backgroundImage = "url(img/" + num + ".bmp)";
	ele.classList.add("number");
	if(num == 0) {
		for(var i = x - 1; i <= x * 1 + 1; i++) {
			for(let j = y - 1; j <= y * 1 + 1; j++) {
				if(document.querySelector(`#a-${i}-${j}`)) {
					clickLeft(document.querySelector(`#a-${i}-${j}`));
				};
			};
		}

	}

}

function clickRight(ele) {
	setTime();
	if(!(ele.classList.contains("number"))) {
		let bool = ele.classList.toggle("flag");
		if(bool) {
			rest--;
			if(ele.classList.contains("lie")) {
				trueNum++;
			}
		} else {
			rest++;
			if(ele.classList.contains("lie")) {
				trueNum--;
			}
		}
		document.querySelector(".rest span").innerText = rest;
	}
	if(trueNum == count || ((boxX * boxY - document.querySelectorAll(".number").length) == count)) {
		myAlert("胜利", 3000);
		clearInterval(time);
		location.reload();
	}
}

function getRandom(start, end) {
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

function setTime() {
	if(!flag) {
		return;
	}
	flag = false;
	time = setInterval(function() {
		timeNum++;
		document.querySelector(".clock").innerText = timeNum;
	}, 1000);
}

function myAlert(message, time = 2000) {
	if(time < 2000) {
		time = 2000;
	}
	let div = document.createElement("div");
	div.style.cssText = `
		width:500px;
		height: 100px;
		background: rgba(0,0,0,0.6);
		position: fixed;
		z-index: 99999;
		right: 0;
		left: 0;
		margin: 0 auto;
		top: 150px;
		padding: 10px;
		text-align: center;
		line-height: 100px;
		color: #fff;
		font-size: 32px;
		border-radius: 5px;
		opacity:0;
		transition:0.5s;
	`;
	div.innerText = message;
	div.addEventListener('transitionend', function() {
		if(div.style.opacity == 0) {
			document.body.removeChild(div);
		}
	});
	document.body.appendChild(div);
	setTimeout(function() {
		div.style.opacity = 1;
	}, 30);
	setTimeout(function() {
		div.style.opacity = 0;
	}, time - 500);
}
window.onkeydown = function(e){
	if(e.keyCode == 27){
		location.reload();
	}
}
function mask(){
	console.log(111);
	let flag = sessionStorage.maskFlag;
	if(!flag){
		let div = document.createElement("div");
		let input = document.createElement("input");
		div.style.cssText = "width: 100vw;height: 100vh;background: rgba(0,0,0,0.7);position: fixed;top: 0;left: 0;display: flex;justify-content: center;align-items: center;";
		input.placeholder = "请输入宋丽蓉有点傻,方可开始游戏";
		input.style.cssText = "width: 500px;height: 70px;padding: 0 10px;font-size: 30px;";
		input.onkeydown = function(e){
			if(e.keyCode == 13 && this.value=="宋丽蓉有点傻" ){
				document.body.removeChild(div);
				myAlert("潘将兵在哈哈大笑...",3000);
			}else if(e.keyCode == 13){
				myAlert("宋老师请不要瞎输入");
			}
		}
		div.appendChild(input);
		document.body.appendChild(div);
		sessionStorage.maskFlag = 1;
	}
}
