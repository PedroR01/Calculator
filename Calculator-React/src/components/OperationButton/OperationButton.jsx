import { useContext } from "react";
import { MyContext } from "../../Context";
import operate from "../../logic/operate.js";

// No estoy respetando los principios de responsabilidad unica porque ademas de aclarar la operación, estoy modificando otros valores?
export default function OperationButton({ btnValue }) {
  const { allOperations, setAllOperations, currentNumber, setCurrentNumber } =
    useContext(MyContext);

  const operators = ["+", "-", "x", "/", "%", "="];
  const special = ["AC", "+/-", "."];

  function handleClick() {
    if (operators.includes(btnValue)) {
      const nuevo = { number: currentNumber, operation: btnValue };

      // HARDCODING: Mismo codigo repetido que en el componente OperatorButton
      const newNumber = currentNumber + btnValue;
      setCurrentNumber(newNumber);

      // ARREGLAR: Que en el caso del primer objeto del array se reemplace, y en el resto se agregen al array. + Que en el nuevo objeto se borre la operacion y el numero anterior.

      // BUG: Hasta el 5to elemento en allOperations lo guarda bien, luego mal. --> No se borra lo anterior cuando se carga una operacion que ya fue hecha anteriormente.
      if (allOperations.length >= 2) {
        // Busqueda de copia de valor en otro elemento que no le corresponde
        for (let i = 0; i < operators.length; i++) {
          const theOperator = operators[i];

          if (nuevo.number.includes(theOperator)) {
            const pos = nuevo.number.indexOf(theOperator);
            const cadena = nuevo.number.substring(pos + 1, nuevo.number.length);
            console.log("ENCONTRADO en la posicion: " + pos);
            console.log("Se removio: " + cadena);
            nuevo.number = cadena;
          }
        }

        // LOGICA: Analizar todos los elementos del array en busqueda de las operaciones con prioridad (* y /). Cuando encuentro una, me freno ahi y hago el calculo entre el numero donde se encontro esa operacion y lo hago con el numero que le sigue, el resultado lo guardo en el index del que tenia la operacion con prioridad y ahora le pongo como numero el resultado y como operacion aquella que habia quedado en el index del numero que le seguia. A su vez, todos los numeros que estaban por delante tienen que retroceder un casillero en el array, y el ultimo espacio debe ser eliminado.

        let priorityValue = { number: "", operation: null };
        let nextToPriorityValue = null;
        const reOrdenamiento = allOperations.map((value) => {
          if (
            (value.operation === "x" || value.operation === "/") &&
            priorityValue.operation == null
          )
            priorityValue = value;
          else {
            nextToPriorityValue = value;
            const result = operate(
              Number(priorityValue.number),
              Number(nextToPriorityValue.number),
              priorityValue.operation
            );
            console.log(
              "Resultado entre " +
                priorityValue.number +
                " y " +
                nextToPriorityValue.number +
                ": " +
                result
            );
          }
        });
        console.log(
          "probando map --> " + priorityValue.number + priorityValue.operation
        );
        operate(1, 2, "+");
      }

      setAllOperations([...allOperations, nuevo]);

      return;
    }

    if (special.includes(btnValue)) {
      return;
    }

    alert("OP ERR");
  }

  return (
    <button
      className="btn btn-outline-dark col-3"
      id={btnValue}
      onClick={() => {
        handleClick();
        console.log([allOperations]);
      }}
    >
      {btnValue}
    </button>
  );
}
