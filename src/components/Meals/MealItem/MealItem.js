import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItemtoCart({
        id: props.id,
        price: props.price,
        title: props.name,
        quantity: amount,
      })
    );
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>

        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
