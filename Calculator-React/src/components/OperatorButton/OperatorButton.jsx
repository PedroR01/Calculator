export default function OperatorButton ({btnValue, handle}){
    const clickHandle = ()=> handle();

    return(
        <button className="btn btn-outline-primary col-3" onClick={handle}>{btnValue}</button>
    )
};