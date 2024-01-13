import { useState } from 'react'
import OutputScreen from "../OutputScreen/OutputScreen";
import OperatorButton from "../OperatorButton/OperatorButton";
import OperationButton from "../OperationButton/OperationButton";

const ERR_OPERATION = "ERR: Invalid Operation";


function operate(first, second, operation){
    if(operation === "+")
        return (first + second).toString();
    else if(operation === "-")
        return (first - second).toString();
    else if(operation === "x")
        return (first * second).toString();
    else if(operation === "/")
        return (first / second).toString();
    else if(operation === "%")
        return (first % second).toString();
    else
        alert(ERR_OPERATION);

}

// Calculator box
function Calculator(){

    const [currentValue, setValue] = useState({
        firstValue: "0",
        secondValue: ""
    });
    const [currentOperation, setOperation] = useState({
        lastOperation: "",
        newOperation: ""
    });

    if(currentOperation.newOperation === "=" || currentOperation.lastOperation != "" && currentOperation.newOperation === currentOperation.lastOperation){
        operate(currentValue.firstValue, currentValue.secondValue, currentOperation.lastOperation);
    };

    const handleNumber = (e) => {
        const clickedNumber = e.target.innerHTML;
    
    // If an operator is set, update secondValue
    if (currentOperation.lastOperation) {
      const newSecondValue = currentValue.secondValue === null ? clickedNumber : currentValue.secondValue + clickedNumber;
      setValue({...currentValue, secondValue: newSecondValue});
    } else {
      // Otherwise, update firstValue
      const newFirstValue = currentValue.firstValue === "0" ? clickedNumber : currentValue.firstValue + clickedNumber;
      setValue({...currentValue, firstValue: newFirstValue});
    }};

    const handleOperation = (e) => {
        if(!currentOperation.lastOperation) 
        setOperation({...currentOperation, lastOperation: e.target.id});
        else 
        setOperation({...currentOperation, newOperation: e.target.id});
    };
    return (
        <>
        <h1>Calculadora</h1>
        <button id='+' onClick={handleOperation}>Prueba</button>
        <div className="row justify-content-center">
            <div className="calculator base card col-md-6">
                {/* // Output */}
                <OutputScreen value={currentValue} operation={currentOperation}/>
    
                {/* // Seccion de los botones */}

                {/* //Botones */}
                <div className="row">
                    <OperationButton btnValue="AC" operation={handleOperation}/>
                    <OperationButton btnValue="+/-" operation={handleOperation}/>
                    <OperationButton btnValue="%" operation={handleOperation}/>
                    <OperationButton btnValue="/" operation={handleOperation}/>
                </div>
                <div className="row">
                    <OperatorButton btnValue="7" handle={handleNumber}/>
                    <OperatorButton btnValue="8" handle={handleNumber}/>
                    <OperatorButton btnValue="9" handle={handleNumber}/>
                    <OperationButton btnValue="x" operation={handleOperation}/>
                </div>
                <div className="row">
                    <OperatorButton btnValue="4" handle={handleNumber}/>
                    <OperatorButton btnValue="5" handle={handleNumber}/>
                    <OperatorButton btnValue="6" handle={handleNumber}/>
                    <OperationButton btnValue="-" operation={handleOperation}/>
                </div>
                <div className="row">
                    <OperatorButton btnValue="1" handle={handleNumber}/>
                    <OperatorButton btnValue="2" handle={handleNumber}/>
                    <OperatorButton btnValue="3" handle={handleNumber}/>
                    <OperationButton btnValue="+" operation={handleOperation}/>
                </div>
                <div className="row">
                    <OperatorButton btnValue="0" handle={handleNumber}/>
                    <OperatorButton btnValue="." operation={handleOperation}/>
                    <OperationButton btnValue="=" operation={handleOperation}/>
                </div>
            </div>
        </div>

        </>
    )
}

export default Calculator;