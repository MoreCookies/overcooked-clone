let ingredients;
let dish_recipes;

class Ingredient {
    constructor(id, recipes, imgref=null) {
        this.id = id
        this.recipes=recipes
        this.imgref = imgref
        //formatted like {"CHOP": "tomato_soup", "COMBINE": }
    }

    change(action) {
        return this.recipes[action]
        //--> then set self to refer to org ingredients list
    }
}


class Plate {
    constructor(items, imgref=null) {
        this.items = items
        this.imgref = imgref
    }

    add_item(item) {
        this.items.push(item)
        /*load everything at the beginning... need placeholders right now
        check if the plate matches any of the recipes, if so add recipename to plate*/
    }
}

//Definitions of all items, any existing instances IN THE GAME are just the NAMES OF THE ITEMS
ingredients  = []

tomato = new Ingredient ("tomato", {"CHOP": "cut_tomato"})
cut_tomato = new Ingredient ("cut_tomato", {}) //Cut tomato is a final processig of the tomato

lettuce = new Ingredient ("lettuce", {"CHOP": "cut_lettuce"})
cut_lettuce = new Ingredient ("cut_lettuce", {}) //Cut tomato is a final processig of the tomato

//Recipes for assembly of foods
dish_recipes  = {"salad": ["cut_tomato", "cut_lettuce"]}



