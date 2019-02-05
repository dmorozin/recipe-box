import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {
      recipes: [
        {
          id: 1,
          name: "Pancakes",
          ingr: [
            "1/2 cups all-purpose flour",
            "3 1/2 teaspoons baking powder",
            "1 teaspoon salt",
            "1 tablespoon white sugar",
            "1 1/4 cups milk",
            "1 egg",
            "3 tablespoons butter melted"
          ]
        },
        {
          id: 2,
          name: "Homemade Pizza",
          ingr: [
            "1 1/2 cups (355 ml) warm water (105°F-115°F)",
            "1 package (2 1/4 teaspoons) of active dry yeast",
            "3 3/4 cups (490 g) bread flour",
            "2 Tbsp olive oil ",
            "2 teaspoons salt",
            "1 teaspoon sugar"
          ]
        }
      ]
    };

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
