import { useContext } from "react";
import { MyContext } from "../../Context";
import "./outputScreen.css";

export default function OutputScreen() {
  const { currentNumber } = useContext(MyContext);
  let result = 0;
  let currentOutput = currentNumber === "" ? "0" : currentNumber;

  return (
    <div className="row out-screen">
      <output className="text-end fs-6 result">{result}</output>
      <output className="text-end fs-4 fw-bold">{currentOutput}</output>
    </div>
  );
}
