import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/index";

const HeaderCartButton = (props) => {
  const [btnisJump, setbtnisJump] = useState(false);
  const dispatch = useDispatch();
  const showCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  //const cartCtx = useContext(CartContext);
  const nocartItems = useSelector((st) => st.cart.totalQuantity);
  const items = useSelector((st) => st.cart.items);
  // const nocartItems = items.reduce((acc, cur) => {
  //   return acc + cur.amount;
  // }, 0);
  const btnClasses = `${classes.button} ${btnisJump ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnisJump(true);
    const timer = setTimeout(() => {
      setbtnisJump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{nocartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
