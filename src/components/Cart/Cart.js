import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/index";
import { cartActions } from "../../store/index";

const Cart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((st) => st.cart.items);
  const totalAmount = useSelector((st) => st.cart.totalAmount).toFixed(2);
  const closeCarthandler = () => {
    dispatch(uiActions.toggleCart());
  };

  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemfromCart(id));
  };
  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItemtoCart({ ...item, quantity: 1 }));
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeCarthandler}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
