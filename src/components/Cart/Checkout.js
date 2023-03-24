import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    enteredValue: nameValue,
    valueIsValid: nameValueIsValid,
    hasError: nameValueHasError,
    valueChangeHandler: nameValueChangeHandler,
    valueBlurHandler: nameValueBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: streetValue,
    valueIsValid: streetValueIsValid,
    hasError: streetValueHasError,
    valueChangeHandler: streetValueChangeHandler,
    valueBlurHandler: streetValueBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: postalCodeValue,
    valueIsValid: postalCodeIsValid,
    hasError: postalCodeValueHasError,
    valueChangeHandler: postalCodeValueChangeHandler,
    valueBlurHandler: postalCodeValueBlurHandler,
    reset: resetPostalCode,
  } = useInput((value) => value.trim().length === 5);

  const {
    enteredValue: cityValue,
    valueIsValid: cityValueIsValid,
    hasError: cityValueHasError,
    valueChangeHandler: cityValueChangeHandler,
    valueBlurHandler: cityValueBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    nameValueIsValid &&
    streetValueIsValid &&
    postalCodeIsValid &&
    cityValueIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("submitted!");

    const userData = {
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
    };

    
    props.onCheckout(userData);

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameClasses = nameValueHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const streetClasses = streetValueHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const postalCodeClasses = postalCodeValueHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const cityClasses = cityValueHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={nameValue}
          onChange={nameValueChangeHandler}
          onBlur={nameValueBlurHandler}
          type="text"
          id="name"
        />
        {nameValueHasError && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          value={streetValue}
          onChange={streetValueChangeHandler}
          onBlur={streetValueBlurHandler}
          type="text"
          id="street"
        />
        {streetValueHasError && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={postalCodeValue}
          onChange={postalCodeValueChangeHandler}
          onBlur={postalCodeValueBlurHandler}
          type="text"
          id="postal"
        />
        {postalCodeValueHasError && <p>Please enter a valid postal code (5 characters long).</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          value={cityValue}
          onChange={cityValueChangeHandler}
          onBlur={cityValueBlurHandler}
          type="text"
          id="city"
        />
        {cityValueHasError && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
