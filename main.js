const ITEMS_CONTAINER = document.getElementById("items");
const ITEMS_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();

function getItems(){
    const value = localStorage.getItem("todo-test") || "[]";
    return JSON.parse(value);

}

function setItems(items){
    const itemsJson = JSON.stringify(items);
    localStorage.setItem("todo-test", itemsJson);
}

function addItem(){
    items.unshift({
        description : "",
        completed: false,
    });

    setItems(items);
    refreshList();
}

function updateItem(item, key ,value){
    item[key] = value;
    setItems(items);
    refreshList();
}

function refreshList(){
    items.sort((a,b) => {
        if(a.description){
            return 1;
        }
        if(b.description){
            return -1;
        }
        return a.description < b.description ? -1:1;
        
    });
    ITEMS_CONTAINER.innerHTML = "";

    for(const item of items){
        const itemElement = ITEMS_TEMPLATE.content.cloneNode(true);
        const decriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");
        decriptionInput.value = item.description;
        completedInput.checked = item.completed;

        decriptionInput.addEventListener("change",() => {
            updateItem(item,"description",decriptionInput.value)
        })

        completedInput.addEventListener("change",() => {
            updateItem(item,"completed",completedInput.checked)
        })

        ITEMS_CONTAINER.appendChild(itemElement);

    }
}
ADD_BUTTON.addEventListener("click",() => {
    addItem();
});

refreshList();