import * as React from "react";
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset";
import "./App.css";
import Chip from "./components/Chip/Chip";
import { useState } from "react";
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel";
import Header from "./components/Header/Header";
import Instructions from "./components/Instructions/Instructions";

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
};
// or this!
const { data, categories, restaurants } = createDataSet();

export function App() {
  const restaurantSelect = false;
  const categorySelect = false;
  const menuSelect = false;
  const [menu_item_state, setMenuItem] = useState("");
  const [category_state, setCategory] = useState("");
  const [restaurant_state, setRestaurant] = useState("");
  
  const restaurantUnselected = false;
  const categoryUnselected = false;
  const menuUnselected = false;

  let currentInstruction = () => {
    let instruction = appInfo.instructions.start

    if (category_state != "" && restaurant_state == ""){
      instruction = appInfo.instructions.onlyCategory
    }
    else if (restaurant_state != "" && category_state == ""){
      instruction = appInfo.instructions.onlyRestaurant
    }
    else if (restaurant_state != "" && category_state != "" && menuUnselected == null){
      instruction = appInfo.instructions.noSelectedItem
    }
    else if (restaurant_state != "" && category_state != "" && menuUnselected != null){
      instruction = appInfo.instructions.allSelected
    }
    return instruction
  }

  const currentMenuItems = data.filter((element) => {
    return (
      element.food_category == category_state &&
      element.restaurant == restaurant_state
    );
  });
  //console.log(currentMenuItems)

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category) => (
            <Chip
              label={category}
              key={category}
              isActive={category_state == category}
              onClick={() => setCategory(category)}
               xOnClick ={() =>{
               setTimeout(() => { setCategory(null); }, 5);
              }}
            />
          ))}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header
          title={appInfo.title}
          tagline={appInfo.tagline}
          description={appInfo.description}
          dataSource={appInfo.dataSource}
        />

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
        
            {restaurants.map((restaurant) => (
              <Chip
                key={restaurant}
                label={restaurant}
                isActive={restaurant_state == restaurant}
                onClick={() => setRestaurant(restaurant)}
                xOnClick ={() =>{
                  setTimeout(() => { setRestaurant(null); }, 5);
                 }}
                 
              />
            ))}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions={currentInstruction()} />

        

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((item) => {
              return (
                <Chip
                  label={item.item_name}
                  isActive={menu_item_state == item}
                  key={item.item_name}
                  onClick={() => setMenuItem(item)}
                  xOnClick ={() =>{
                    setTimeout(() => { setMenuItem(null); }, 5);
                   }}
                  
                />
              );
            })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {menu_item_state != null ? (
              <NutritionalLabel item={menu_item_state} />
            ) : null}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
