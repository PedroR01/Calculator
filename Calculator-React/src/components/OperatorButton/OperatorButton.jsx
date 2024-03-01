import { useContext } from "react";
import { MyContext } from "../../Context";
import HandleClick from '../../logic/handleButtonValue';

export default function OperatorButton ({btnValue}){
    const {nValue, setValue} = useContext(MyContext);
    return(
        <button className="btn btn-outline-primary col-3" onClick={() => HandleClick(btnValue, nValue, setValue)}>{btnValue}</button>
    )
};