import { useContext, useEffect } from "react";
import { MyContext } from "../../Context";

export default function OperatorButton({ btnValue }) {
  const { currentNumber, setCurrentNumber } = useContext(MyContext);

  function handleClick() {
    const newNumber = currentNumber + btnValue;
    setCurrentNumber(newNumber);
  }

  return (
    <button className="btn btn-outline-primary col-3" onClick={handleClick}>
      {btnValue}
    </button>
  );
}
