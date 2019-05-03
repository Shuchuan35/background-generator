var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");

var bg = getComputedStyle(body).background;
var str = bg.substring(bg.indexOf("linear-gradient"));
// console.log(bg);
var colors = str.substring(str.indexOf("(") + 1, str.indexOf(")")).split(",");

color1.value = nameToHex(colors[1]);
color2.value = nameToHex(colors[2]);

css.textContent = "linear-gradient(to right, "
	+ nameToRGB(colors[1])
	+ ", "
	+ nameToRGB(colors[2])
	+ ")";
// console.log(body.style.background);
function nameToRGB(name) {
	let fakeDiv = document.createElement("div");
	fakeDiv.style.color = name;
	document.body.appendChild(fakeDiv);

	let cs = window.getComputedStyle(fakeDiv),
		pv = cs.getPropertyValue("color");

	document.body.removeChild(fakeDiv);
	return pv;
}
// CSS Tricks
function nameToHex(name) {
	// Get RGB from named color in temporary div
	let fakeDiv = document.createElement("div");
	fakeDiv.style.color = name;
	document.body.appendChild(fakeDiv);

	let cs = window.getComputedStyle(fakeDiv),
		pv = cs.getPropertyValue("color");

	document.body.removeChild(fakeDiv);

	// console.log(pv);
	// Code ripped from RGBToHex() (except pv is substringed)
	let rgb = pv.substr(4).split(")")[0].split(","),
		r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length == 1)
		r = "0" + r;
	if (g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;

	return "#" + r + g + b;
}

function RGBToHex(r, g, b) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	if (r.length == 1)
		r = "0" + r;
	if (g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;

	return "#" + r + g + b;
}

function setGradient() {
	body.style.background =
		"linear-gradient(to right, "
		+ color1.value
		+ ", "
		+ color2.value
		+ ")";

	css.textContent = body.style.background;
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);