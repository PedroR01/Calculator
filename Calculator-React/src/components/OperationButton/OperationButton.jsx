import { useContext } from "react";
import { MyContext } from "../../Context";

function handleOperation(op, operationObject, opSetter) {
  // Estos conviene que esten adentro o afuera? Adentro hace que permanezcan unicamente donde se usan, pero el problema es que cada vez que se llama a la función se crean estos arreglos, gastando recursos por cada click.
  const operators = ["+", "-", "x", "/", "%", "="];

  const special = ["AC", "+/-", "."];

  //const operation = operationObject[operationObject.length - 1];

  if (operators.includes(op)) {
    console.log(
      "OPERACION OBJETO ANTES=> " +
        operationObject[operationObject.length - 1].operation
    );
    operationObject[operationObject.length - 1].operation = op;
    console.log(
      "OPERACION OBJETO => " +
        operationObject[operationObject.length - 1].operation
    );

    const nuevo = { number: "", operation: null };
    opSetter([...operationObject, nuevo]);
    return;
  }

  if (special.includes(op)) {
    return;
  }

  alert("OP ERR");
}

export default function OperationButton({ btnValue }) {
  const { allOperations, setAllOperations } = useContext(MyContext);

  return (
    <button
      className="btn btn-outline-dark col-3"
      id={btnValue}
      onClick={() => {
        handleOperation(btnValue, allOperations, setAllOperations);
      }}
    >
      {btnValue}
    </button>
  );
}
