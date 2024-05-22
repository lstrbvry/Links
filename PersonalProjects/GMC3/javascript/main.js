import { product, saveToStorage } from "./products.js";
const allSearchBox = document.querySelectorAll(".search-box");
const genericSearch = document.querySelectorAll(".js-generic-search");
const genericLists = document.querySelectorAll(".option.generic");
const brandLists = document.querySelector(".option.branded");
let allLists;
const allButtons = document.querySelectorAll("button");
let genericValue;
const addGenericButton = document.querySelector(".js-add-generic-button");
const addBrandButton = document.querySelector(".js-add-brand-button");
const deleteGenericButton = document.querySelector(".js-delete-generic-button");
const deleteBrandedButton = document.querySelector(".js-delete-branded-button");
const brandSearch = document.querySelector(".js-brand-look");

function displayBrandedDescription() {
	const brandValue = document.querySelector(".js-brand-value").innerText;
	const brandForm = document.querySelector(".js-description-form");
	const brandPrice = document.querySelector(".js-description-price");
	const descriptionArray = document.querySelectorAll("js-description-array");
	product.forEach((item) => {
		if (item.genericName === genericValue) {
			item.description.forEach((brand) => {
				if (brand.brandName === brandValue) {
					brandForm.innerHTML = brand.formulation;
					brandPrice.innerHTML = brand.price;
				}
			});
		}
	});
}
function deleteBrandName() {
	const brandValue = document.querySelector(".js-brand-value").innerText;
	product.forEach((item) => {
		if (item.genericName === genericValue) {
			item.description.forEach((brand, index) => {
				if (brand.brandName === brandValue) {
					item.description.splice(index, 1);
				}
			});
			saveToStorage();
			document.querySelector(".js-brand-value").innerHTML = "";
			document.querySelector(".js-description-form").innerHTML = "";
			document.querySelector(".js-description-price").innerHTML = "";
		}
	});

	displayBrandedOption();
}
function addBrand() {
	let continueLoop = true;
	const brandArray = document.querySelectorAll(".js-add-brand");
	brandArray.forEach((array) => {
		if (array.value === "") {
			continueLoop = false;
		}
	});
	if (
		continueLoop &&
		Number(brandArray[2].value) &&
		!Number(brandArray[0].value)
	) {
		product.forEach((item) => {
			if (item.genericName === genericValue) {
				item.description.push({
					brandName: brandArray[0].value,
					formulation: brandArray[1].value,
					price: brandArray[2].value,
				});
				saveToStorage();
			}
		});
		brandArray.forEach((item) => {
			item.value = "";
		});
	}
	displayBrandedOption();
}
function checkGenericDuplicate() {
	let isDuplicate = false;
	const inputValue = document.querySelector(".js-add-generic-input").value;
	product.forEach((item) => {
		if (item.genericName === inputValue) {
			isDuplicate = true;
		}
	});
	return isDuplicate;
}
function addGeneric() {
	const inputValue = document.querySelector(".js-add-generic-input").value;
	if (checkGenericDuplicate() === false && inputValue !== "") {
		product.push({
			genericName: inputValue,
			description: [],
		});
		document.querySelector(".js-add-generic-input").value = "";
		saveToStorage();
	} else {
		return;
	}
}
function addEventsToAllButtons() {
	allButtons.forEach((button) => {
		button.addEventListener("click", () => {
			displayGenericOption();
		});
	});
}
function addEventsToAllLists(list, fun) {
	list.forEach((li) => {
		li.addEventListener("click", () => {
			fun;
			console.log("hel");
		});
	});
}
function displayGenericOption() {
	let HTML = ``;
	product.forEach((product) => {
		HTML += `<li>${product.genericName}</li>`;
	});
	genericLists.forEach((option) => {
		option.innerHTML = HTML;
	});
	let list = [];
	genericLists.forEach((option) => {
		option.querySelectorAll("li").forEach((li) => {
			list.push(li);
		});
	});
	addEventsToDetermineGenericValue();
	addEventsToDetermineDeleteGenericValue();
}
function displayBrandedOption() {
	genericValue = document.querySelector(".js-generic-value").innerText;
	let HTML = "";
	product.forEach((product) => {
		if (product.genericName === genericValue) {
			if (product.description) {
				product.description.forEach((item) => {
					HTML += `<li>${item.brandName}</li>`;
				});
			}
		}
	});
	if (HTML !== "") {
		brandLists.innerHTML = HTML;
	} else {
		brandLists.innerHTML = `<li>Please add a brand</li>`;
	}

	const list = brandLists.querySelectorAll("li");
	addEventsToDetermineBrandValue();
}
function addEventsToDetermineBrandValue() {
	const option = document.querySelector(".js-brand-clicked");
	option.querySelectorAll("li").forEach((li) => {
		li.addEventListener("click", () => {
			const listcontainer = document.querySelectorAll(".list-container")[2];
			listcontainer.classList.toggle("visible");
			const brandedValue = li.innerText;
			document.querySelector(".js-brand-value").innerText = brandedValue;
			displayBrandedDescription();
		});
	});
}
function addEventsToDetermineGenericValue() {
	const option = document.querySelector(".value");
	option.querySelectorAll("li").forEach((li) => {
		li.addEventListener("click", () => {
			const listcontainer = document.querySelectorAll(".list-container")[0];
			listcontainer.classList.toggle("visible");
			genericValue = li.innerText;
			document.querySelector(".js-generic-value").innerHTML = genericValue;
			displayBrandedOption();
		});
	});
}
function deleteGeneric() {
	const deleteValue = document.querySelector(".js-value-delete");
	product.forEach((item, index) => {
		if (item.genericName === genericValue) {
			product.splice(index, 1);
			saveToStorage();
		}
	});

	displayGenericOption();
	deleteValue.innerHTML = "";
}
function addEventsToDetermineDeleteGenericValue() {
	const option = document.querySelector(".js-delete-generic-option");
	option.querySelectorAll("li").forEach((li) => {
		li.addEventListener("click", () => {
			const listcontainer = document.querySelectorAll(".list-container")[1];
			listcontainer.classList.toggle("visible");
			genericValue = li.innerText;
			document.querySelector(".js-value-delete").innerHTML = genericValue;
		});
	});
}
function searchToLookGeneric(searchValue) {
	const options = document.querySelector(".value");
	const allList = options.querySelectorAll("li");
	allList.forEach((li) => {
		li.classList.add("hide");
		if (li.innerText.toLowerCase().includes(searchValue)) {
			li.classList.remove("hide");
		}
	});
}
function searchToDeleteGeneric(searchValue) {
	const options = document.querySelector(".js-delete-generic-option");
	const allList = options.querySelectorAll("li");
	allList.forEach((li) => {
		li.classList.add("hide");
		if (li.innerText.toLowerCase().includes(searchValue)) {
			li.classList.remove("hide");
		}
	});
}
function searchToLookBranded(searchValue) {
	const options = document.querySelector(".js-brand-look-options");
	const allList = options.querySelectorAll("li");
	allList.forEach((li) => {
		li.classList.add("hide");
		if (li.innerText.toLowerCase().includes(searchValue)) {
			li.classList.remove("hide");
		}
	});
}
document.addEventListener("DOMContentLoaded", () => {
	displayGenericOption();
	displayBrandedOption();
	addGenericButton.addEventListener("click", () => {
		addGeneric();
		displayGenericOption();
	});
	addBrandButton.addEventListener("click", () => {
		addBrand();
	});
	deleteGenericButton.addEventListener("click", () => {
		deleteGeneric();
	});
	deleteBrandedButton.addEventListener("click", () => {
		deleteBrandName();
	});

	genericSearch[0].addEventListener("input", () => {
		searchToLookGeneric(genericSearch[0].value);
		// searchToDeleteGeneric(generc.value);
	});
	genericSearch[1].addEventListener("input", () => {
		searchToDeleteGeneric(genericSearch[1].value);
	});
	brandSearch.addEventListener("input", () => {
		searchToLookBranded(brandSearch.value);
	});
	allSearchBox[0].addEventListener("click", () => {
		const listcontainer = document.querySelectorAll(".list-container")[0];
		listcontainer.classList.toggle("visible");
	});
	allSearchBox[1].addEventListener("click", () => {
		const listcontainer = document.querySelectorAll(".list-container")[1];
		listcontainer.classList.toggle("visible");
	});
	allSearchBox[2].addEventListener("click", () => {
		const listcontainer = document.querySelectorAll(".list-container")[2];
		listcontainer.classList.toggle("visible");
	});
});
