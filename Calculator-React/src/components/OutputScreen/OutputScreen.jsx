import { useContext } from "react";
import { MyContext } from "../../Context";
import "./outputScreen.css";

export default function OutputScreen() {
  const { allOperations, currentNumber } = useContext(MyContext);
  let result = 0;
  let currentOutput = currentNumber === "" ? "0" : currentNumber;
  // Decidir cuando mostrar el currentNumber o el allOperations a traves de los cambios en el currentOutput.

  return (
    <div className="row out-screen">
      <output className="text-end fs-6 result">{result}</output>
      <output className="text-end fs-4 fw-bold">{currentOutput}</output>
    </div>
  );
}
