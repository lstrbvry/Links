function hot() {
	const min = 29;
	const max = 31;
	const inTemp = (Math.random() * (max - min) + min).toFixed(1);
	return Number(inTemp);
}
function cold() {
	const min = 24;
	const max = 27;
	const inTemp = (Math.random() * (max - min) + min).toFixed(1);
	return Number(inTemp);
}
function difference() {
	const min = 0.4;
	const max = 0.8;
	const difference = (Math.random() * (max - min) + min).toFixed(1);
	return Number(difference);
}

function humidity() {
	const min = 45;
	const max = 70;
	const humidity = Math.round(Math.random() * (max - min) + min);
	return humidity;
}
// console.log(hot());
// console.log(cold());
// console.log(humidity());
// console.log(difference());

// Elements

const inContainer = document.querySelector(".js-invalue");
const outContainer = document.querySelector(".js-outvalue");
const humidityContainer = document.querySelector(".js-humidvalue");
let intervalID;
let climateState = "";
//Main
function displayTemp(climate) {
	const InValue = climate();
	inContainer.innerHTML = InValue.toFixed(1);
	outContainer.innerHTML = (InValue + difference()).toFixed(1);
	humidityContainer.innerHTML = humidity();
}
function startInterval(climate) {
	displayTemp(climate);
	if (intervalID) {
		clearInterval(intervalID);
	}
	intervalID = setInterval(() => {
		// const InValue = climate();
		// inContainer.innerHTML = InValue.toFixed(1);
		// outContainer.innerHTML = (InValue + difference()).toFixed(1);
		// humidityContainer.innerHTML = humidity();
		displayTemp(climate);
	}, 3000);
}
function displayTime() {
	// Create a new Date object
	const now = new Date();
	// Get the current hour, minute, and second
	let hour = now.getHours();
	let ampm;
	let minute = now.getMinutes();
	if (minute < 10) {
		minute = "0" + minute;
	}
	const hour12 = hour % 12;
	if (hour >= 12) {
		ampm = "PM";
	} else {
		ampm = "AM";
	}
	ampmContainer.innerHTML = ampm;
	minContainer.innerHTML = minute;
	hourContainer.innerHTML = hour12;
}

const hourContainer = document.querySelector(".js-hour");
const ampmContainer = document.querySelector(".js-ampm");
const minContainer = document.querySelector(".js-min");
const hotButton = document.querySelector(".hot");
const coldButton = document.querySelector(".cold");
const genButton = document.querySelector(".gen-button");
hotButton.addEventListener("click", () => {
	document.querySelectorAll(".active").forEach((active) => {
		active.classList.remove("active");
	});
	hotButton.classList.add("active");
	startInterval(hot);
	climateState = "hot";
});
coldButton.addEventListener("click", () => {
	document.querySelectorAll(".active").forEach((active) => {
		active.classList.remove("active");
	});
	coldButton.classList.add("active");
	startInterval(cold);
	climateState = "cold";
});

genButton.addEventListener("click", () => {
	if (intervalID) {
		clearInterval(intervalID);
	}
	if (climateState === "hot") {
		displayTemp(hot);
	} else if (climateState === "cold") {
		displayTemp(cold);
	} else {
		displayTemp(hot);
	}
});
setInterval(() => {
	displayTime();
}, 60000);

document.addEventListener("DOMContentLoaded", () => {
	hotButton.click();
	displayTime();
});
