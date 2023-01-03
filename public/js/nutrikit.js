function updateMenu() {
    let category;
    let select = document.getElementById("food-category");
    switch (select.value){
        case "protein":
            category = proteins;
            break;
        case "fruits":
            category = fruits;
            break;
        case "vegetables":
            category = vegetables;
            break;
        case "dairy":
            category = dairy;
            break;
        case "grain":
            category = grains;
            break;    
    }

    for(i = 0; i < select.options.length; i++){
        let select = document.getElementById("menu-item");
        food = JSON.parse(category[i]);
        select.options[i] = new Option(food.name, food.calories);
    }
}

function changeDirection(action) {
    let direction = document.getElementById('move-item').textContent;
    if ((direction === "<<" && action === "add") || (direction === ">>" && action === "remove")) {
            direction = (direction === "<<") ? ">>" : "<<";
            document.getElementById('move-item').textContent = direction;
        }
}

function moveItem() {
    let direction = document.getElementById('move-item').textContent;
    if(direction === ">>" && document.getElementById("menu-item").value !== ""){
        let menu = document.getElementById("menu-item");
        let item = menu[menu.selectedIndex];

        let select = document.getElementById("selected-item");
        select.options[select.options.length] = new Option(item.text, item.value);
        updateTotalCalories();
    }
    if(direction === "<<" && document.getElementById("selected-item").value !== ""){
        items = document.getElementById("selected-item");
        items.remove(items.selectedIndex);
        updateTotalCalories();
    }
}

function updateTotalCalories() {
    let select = document.getElementById("selected-item");
    let total = 0;
    for(i = 0; i < select.options.length; i++){
        total += parseInt(select[i].value)
    }
    document.getElementById("total-calories").textContent = "Total Calories: " + total;
}
