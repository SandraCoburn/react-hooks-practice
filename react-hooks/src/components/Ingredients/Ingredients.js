import React from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

const Ingredients = () => {
  return (
    <div className="App">
      <IngredientForm />
      <section>
        <Search />
      </section>
    </div>
  );
};
export default Ingredients;
