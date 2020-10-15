import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    //browser function is built into modern browsers to understand the request. By default will send a get request
    fetch("https://react-hooks-6a0d2.firebaseio.com//ingredients.json", {
      method: "POST",
      body: JSON.stringify({ ingredient }), //firebase will generate an id
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json(); //will get the response to convert it from json to normal javascript code
      })
      .then((responseData) => {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }, // we get the id from firebase response
        ]);
      });
  };

  const removeItemHandler = (id) => {
    let newIngredients = ingredients.filter((ing) => ing.id !== id);
    setIngredients(newIngredients);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
      </section>
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeItemHandler}
      />
    </div>
  );
};
export default Ingredients;
