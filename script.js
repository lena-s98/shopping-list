const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const items = document.querySelectorAll("ul li");

function addItem(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	// Validate input
	if (newItem === "") {
		alert("Please add an item.");
		return;
	}

	// Create list item
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(newItem));

	// Create button
	const button = createButton("remove-item btn-link text-red");

	// Append button to list item
	li.appendChild(button);

	// Append to the list
	itemList.appendChild(li);

	// Clear value
	itemInput.value = "";
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
		e.target.parentElement.parentElement.remove();
	}
}

function clearList() {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearList);
