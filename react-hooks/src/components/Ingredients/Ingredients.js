import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  //useEffect function gets executed after rendering the component, on second rerender and after every rendering
  useEffect(() => {
    fetch("https://react-hooks-6a0d2.firebaseio.com/ingredients.json")
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        console.log("respone", responseData);
        console.log("loadedIng", loadedIngredients);
        for (const key in responseData) {
          console.log("key", key);
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = (ingredient) => {
    //browser function is built into modern browsers to understand the request. By default will send a get request
    fetch("https://react-hooks-6a0d2.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient), //firebase will generate an id
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json(); //will get the response to convert it from json to normal javascript code
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }, // we get the id from firebase response
        ]);
      });
  };

  const removeItemHandler = (ingredientId) => {
    setUserIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  const filteredIngredientsHandler = () => {
    setUserIngredients(filteredIngredients);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeItemHandler}
        />
      </section>
    </div>
  );
};
export default Ingredients;
