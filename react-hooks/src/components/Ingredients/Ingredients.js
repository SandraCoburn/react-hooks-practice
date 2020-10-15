import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient },
    ]);
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
