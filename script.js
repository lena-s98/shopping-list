const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

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

function addItemToStorage(item) {
	let itemsFromStorage;
	if (localStorage.getItem("items") === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem("items"));
	}

	// Add new item to array
	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage
	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
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

function removeItem(e) {
	if (e.target.parentElement.classList.contains("remove-item")) {
		if (confirm("Remove this item?")) {
			e.target.parentElement.parentElement.remove();
			checkUI();
		}
	}
}

function clearList() {
	if (confirm("Remove all Items?")) {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}
	}
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
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearList);
itemFilter.addEventListener("input", filterItems);

checkUI();
