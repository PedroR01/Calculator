// Quedaria mas ordenado y prolijo si pudiera importar el contexto y usarlo desde aqui mismo. -- ¿HAY ALGUNA SOLUCION PARA ESTO? xq no me dejaba al estar llamando a un hook desde una funcion normal, que no sea un componente.

const operators = [
    "+",
    "-",
    "x",
    "/",
    "%",
    "="
]

const special = [
    "AC",
    "+/-",
    "."
]

export default function HandleClick(id, _value, setter){
    
    const buttonID = id;
    //const nuevo = {number:"60", operation: "*"};
    console.log(buttonID);
    console.log(_value);
    //Para cualquiera de los 3 casos, se va a tener que comunicar con el output para ir mostrando el input
    //Solo se van a hacer cuentas cuando haya un operador como minimo de por medio
    //Para hacer varias cuentas en simultaneo, se arma una lista con elementos compuestos por numeros, operacion y el siguiente introducido

    // Operaciones
    if(operators.includes(buttonID)){
        
        // Si entra a aca, en este caso, el valor del boton es una operacion.
        _value.operation = buttonID;
        // Al ser una operacion, se le asigna su valor al valor a modificar, que tambien sera una operacion en concreto, y por ende se crea un nuevo espacio en el array de los valores.
        // EJECUCION DEL SETTER
        const nuevo = {number: "0", operation: null};
        setter([..._value, nuevo]);
 
        return;
    }
    // Números
    if(buttonID >= 0 && buttonID <= 9){

        //_value += buttonID;
        _value += buttonID;
    
        setter(..._value, "2");
     
        return;
    }
    // Conversiones y botones de calculadora
    if(special.includes(buttonID)){

        console.log("Special");
     
        return;
    }
   
};