export let product = getProductFromStorage() || [
	{
		genericName: "Paracetamol",
		description: [
			{
				brandName: "Biogesic",
				formulation: "500mg Tablet",
				price: "4.5",
			},
			{
				brandName: "Tempra",
				formulation: "250mg/5ml",
				price: "103",
			},
		],
	},
	{
		genericName: "Acetylcysteine",
		description: [
			{
				brandName: "Fluimucil",
				formulation: "200mg Tablet",
				price: "11",
			},
		],
	},
	{
		genericName: "Amoxicillin",
		description: [
			{
				brandName: "Savermox",
				formulation: "500mg Tablet",
				price: "4",
			},
		],
	},
];

export function saveToStorage() {
	localStorage.setItem("product", JSON.stringify(product));
}

function getProductFromStorage() {
	const store = JSON.parse(localStorage.getItem("product"));
	return store;
}
