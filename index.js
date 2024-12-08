document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("itemInput");
    const addButton = document.getElementById("addButton");
    const markPurchasedButton = document.getElementById("markPurchasedButton");
    const clearButton = document.getElementById("clearButton");
    const shoppingList = document.getElementById("shoppingList");

    let shoppingItems = [];

    addButton.addEventListener("click", handleAddItem);
    markPurchasedButton.addEventListener("click", handleMarkAllPurchased);
    clearButton.addEventListener("click", handleClearList);
    shoppingList.addEventListener("click", handleItemPurchase);

    loadFromLocalStorage();

    function handleAddItem() {
        const newItem = itemInput.value.trim();
        if (newItem !== "") {
            shoppingItems.push(newItem);
            updateShoppingList();
            itemInput.value = "";
            saveToLocalStorage();
            console.log(`Added: "${newItem}" to the shopping list.`);
        } else {
            console.log("Input field is empty. Please enter an item.");
        }
    }

    function handleMarkAllPurchased() {
        const listItems = shoppingList.querySelectorAll("li");
        listItems.forEach(li => {
            li.classList.add("purchased");
        });
        saveToLocalStorage();
        console.log("Marked all items as purchased.");
    }

    function handleClearList() {
        shoppingItems = [];
        updateShoppingList();
        localStorage.removeItem("shoppingList");
        console.log("Cleared the entire shopping list.");
    }

    function handleItemPurchase(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("purchased");
            saveToLocalStorage();
            console.log(`Toggled purchase status for: "${event.target.textContent}"`);
        }
    }

    function updateShoppingList() {
        shoppingList.innerHTML = "";
        shoppingItems.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${item}`;
            listItem.dataset.index = index;
            shoppingList.appendChild(listItem);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingItems));
    }

    function loadFromLocalStorage() {
        const storedItems = localStorage.getItem("shoppingList");
        if (storedItems) {
            shoppingItems = JSON.parse(storedItems);
            updateShoppingList();
            console.log("Loaded shopping list from local storage.");
        }
    }
});