import { useState } from "react";
import { MyContext } from "../../Context";
import OutputScreen from "../OutputScreen/OutputScreen";
import OperatorButton from "../OperatorButton/OperatorButton";
import OperationButton from "../OperationButton/OperationButton";

// Calculator box
function Calculator() {
  const defaultValue = [{ number: "0", operation: null }];
  const [allOperations, setAllOperations] = useState(defaultValue);
  const [currentNumber, setCurrentNumber] = useState("");

  // ---
  return (
    <>
      <h1>Calculadora</h1>

      <div className="row justify-content-center">
        <div className="calculator base card col-md-6">
          <MyContext.Provider
            value={{
              allOperations,
              setAllOperations,
              currentNumber,
              setCurrentNumber,
            }}
          >
            {/* // Output */}
            <OutputScreen />

            {/* // Seccion de los botones */}

            {/* //Botones */}
            <div className="row">
              <OperationButton btnValue="AC" />
              <OperationButton btnValue="+/-" />
              <OperationButton btnValue="%" />
              <OperationButton btnValue="/" />
            </div>
            <div className="row">
              <OperatorButton btnValue="7" />
              <OperatorButton btnValue="8" />
              <OperatorButton btnValue="9" />
              <OperationButton btnValue="x" />
            </div>
            <div className="row">
              <OperatorButton btnValue="4" />
              <OperatorButton btnValue="5" />
              <OperatorButton btnValue="6" />
              <OperationButton btnValue="-" />
            </div>
            <div className="row">
              <OperatorButton btnValue="1" />
              <OperatorButton btnValue="2" />
              <OperatorButton btnValue="3" />
              <OperationButton btnValue="+" />
            </div>
            <div className="row">
              <OperatorButton btnValue="0" />
              <OperatorButton btnValue="." />
              <OperationButton btnValue="=" />
            </div>
          </MyContext.Provider>
        </div>
      </div>
    </>
  );
}

export default Calculator;
