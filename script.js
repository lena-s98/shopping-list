const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

function displayItems() {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDOM(item));
	checkUI();
}

function onaddItemSubmit(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	// Validate input
	if (newItem === "") {
		alert("Please add an item.");
		return;
	}

	// Add item to DOM
	addItemToDOM(newItem);

	// Add item to storage
	addItemToStorage(newItem);

	checkUI();

	// Clear value
	itemInput.value = "";
}

function addItemToDOM(item) {
	// Create list item
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(item));

	// Create button
	const button = createButton("remove-item btn-link text-red");

	// Append button to list item
	li.appendChild(button);

	// Append to the list
	itemList.appendChild(li);
}

function createButton(classes) {
	const btn = document.createElement("button");
	btn.className = classes;
	const icon = createIcon("fa-solid fa-xmark");
	btn.appendChild(icon);
	return btn;
}

function createIcon(classes) {
	const icon = document.createElement("i");
	icon.className = classes;
	return icon;
}

function addItemToStorage(item) {
	const itemsFromStorage = getItemsFromStorage();

	// Add new item to array
	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage
	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
	let itemsFromStorage;
	if (localStorage.getItem("items") === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem("items"));
	}

	return itemsFromStorage;
}

function onClickItem(e) {
	if (e.target.parentElement.classList.contains("remove-item")) {
		removeItem(e.target.parentElement.parentElement);
	}
}

function removeItem(item) {
	if (confirm("Delete item?")) {
		// Remove item from DOM
		item.remove();

		// Remove item from storage
		removeItemFromStorage(item.textContent);

		checkUI();
	}
}

function removeItemFromStorage(item) {
	let itemsFromStorage = getItemsFromStorage();

	// Filter out item to be removed from storage
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

	// Re-set to local storage
	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearList() {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}

	localStorage.removeItem("items");

	checkUI();
}

function checkUI() {
	const items = document.querySelectorAll("ul li");
	if (items.length === 0) {
		itemFilter.style.display = "none";
		clearBtn.style.display = "none";
	} else {
		itemFilter.style.display = "block";
		clearBtn.style.display = "block";
	}
}

function filterItems(e) {
	const items = document.querySelectorAll("ul li");
	items.forEach((item) => {
		let textValue = item.firstChild.textContent;
		textValue.toUpperCase().includes(e.target.value.toUpperCase())
			? (item.style.display = "")
			: (item.style.display = "none");
	});
}

// Event Listeners
itemForm.addEventListener("submit", onaddItemSubmit);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearList);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
