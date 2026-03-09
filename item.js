class Ingredient {
    constructor(id, recipes, imgref=null) {
        this.id = id
        this.recipes=recipes
        this.imgref = imgref

        //formatted like {"CHOP": "tomato_soup", "COMBINE": }
        if(this.id == "plate") { this.items = [] }
    }

    change(action) {
        return this.recipes[action]
    }

    //Plate methods
    add_item(item) {
        if(this.items.length < 3) {
            this.items.push(item)
        }
    }

    check_recipe(dish_recipes) {
        for(var i = 0; i<dish_recipes.length;i++) {
            isEqual = dish_recipes[i].every((element, index) => element === this.items[index]);
            this.recipe = (isEqual) ? Object.keys(dish_recipes)[i] : "";
            console.log(this.recipe)
        }
    }
}


// class Plate {
//     constructor(items, imgref=null) {
//         this.items = items
//         this.imgref = imgref
//         this.recipe = ""
//     }

//     add_item(item) {
//         if(this.items.length < 3) {
//             this.items.push(item)
//         }
//         /*load everything at the beginning... need placeholders right now
//         check if the plate matches any of the recipes, if so add recipename to plate*/
//     }

//     check_recipe(dish_recipes) {
//         for(var i = 0; i<dish_recipes.length;i++) {
//             isEqual = dish_recipes[i].every((element, index) => element === this.items[index]);
//             this.recipe = (isEqual) ? Object.keys(dish_recipes)[i] : "";
//             console.log(this.recipe)
//         }
//     }
// }



