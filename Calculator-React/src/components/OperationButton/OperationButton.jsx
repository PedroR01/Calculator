export default function OperationButton ({btnValue, operation}){
    
    return(
        <button className="btn btn-outline-dark col-3" id={btnValue} onClick={operation}>{btnValue}</button>
    )
};