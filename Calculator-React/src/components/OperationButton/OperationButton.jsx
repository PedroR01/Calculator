import { useContext } from "react";
import { MyContext } from "../../Context";
import HandleClick from '../../logic/handleButtonValue';

export default function OperationButton ({btnValue}){
    const {nValue, setValue} = useContext(MyContext);
    return(
        <button className="btn btn-outline-dark col-3" id={btnValue} onClick={() => HandleClick(btnValue, nValue, setValue)}>{btnValue}</button>
    )
};