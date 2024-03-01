import './outputScreen.css'
export default function OutputScreen (){
    let result = 0;
    
    /*if(operation === "" || operation === "=")
        currentValue = value.firstValue.toString();
    else
        currentValue = value.firstValue.toString() + operation.lastOperation + value.secondValue.toString();*/

    //Necesito obtener el valor que se va ingresando
    //Escribir todo lo que se vaya recibiendo y que no sea nulo
    //Las operaciones se realizan unicamente en calculator

    //¿Para mostrar el estimativo del resultado conviene calcularlo aca o pasarlo como otro parametro?
   
    return(
        <div className="row out-screen">
            <output className="text-end fs-6 result">{result}</output>
            <output className="text-end fs-4 fw-bold">{result}</output>
        </div>
    )
};