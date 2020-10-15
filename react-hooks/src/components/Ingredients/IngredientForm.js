import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [inputState, setInputState] = useState({ title: "", amount: "" });
  const submitHandler = (event) => {
    event.preventDefault();
    //...
  };
  return (
    <section>
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputState.title}
              onChange={(event) => {
                const newTitle = event.target.value;
                setInputState((previousInputState) => ({
                  title: newTitle,
                  amount: previousInputState.amount,
                }));
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState.amount}
              onChange={(event) => {
                const newAmount = event.target.value;
                setInputState((previousInputState) => ({
                  amount: newAmount,
                  title: previousInputState.title,
                }));
              }}
            />
          </div>
          <div className="ingredient-form_actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
