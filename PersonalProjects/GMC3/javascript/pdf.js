import { product, saveToStorage } from "./products.js";
product.sort((a, b) => a.genericName.localeCompare(b.genericName));
console.log(product);
const container = document.querySelector(".container");
function createATableForProducts() {
	let HTML = "";
	product.forEach((product) => {
		const genericName = product.genericName;

		HTML += `
			<div class="generic row-grid2">
				<div class="label-generic">Generic:</div>
				<div class="label-value">${genericName}</div>
			</div>`;

		if (product.description !== undefined && product.description.length !== 0) {
			product.description.forEach((item) => {
				HTML += `
			<div class="description row-grid">
				<div class="brand-value">${item.brandName}</div>
				<div class="form-value">${item.formulation}</div>
				<div class="price-value">₱ ${Number(item.price).toFixed(2)}</div>
			</div>`;
			});
		} else {
			HTML += `
			<div class="no-brand">
				No Brand, Please Add
			</div>`;
		}

		container.innerHTML = `<h1>Generic Menu Card</h1> ${HTML}`;
	});
}
document.addEventListener("DOMContentLoaded", () => {
	createATableForProducts();
	// Add click event listener to the button
	document
		.getElementById("download-pdf")
		.addEventListener("click", function () {
			const options = {
				margin: 0.5, // Adjust margins if needed
				filename: "converted_document.pdf",
				image: { type: "png", quality: 1.0 }, // Adjust image quality
				html2canvas: { scale: 2 }, // Increase scale for higher resolution
				jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
			};
			// Get the HTML element to convert
			const element = document.getElementById("container");
			// Call html2pdf library to convert and download
			html2pdf().set(options).from(element).save("GenericMenuCard.pdf");
		});
});
