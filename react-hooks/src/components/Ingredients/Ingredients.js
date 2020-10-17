import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  //useEffect function gets executed after rendering the component, on second rerender and after every rendering
  // useEffect(() => {
  //   fetch("https://react-hooks-6a0d2.firebaseio.com/ingredients.json")
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = Object.keys(responseData).map((key, val) => {
  //         return {
  //           id: responseData[key],
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         };
  //       });
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

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
        console.log("responseData", responseData);
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

  //useCallback allows to wrap a function, first arguement is your function second argument is your dependency
  //so it will survive useEffect re rendering cycles by checking if its' the same as previous rendering to prevent re rendering
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []); // we don't need to add setUserIngredients as dependency because that's state and will only change it state changes

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
