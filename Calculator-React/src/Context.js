import { createContext } from "react";

const defaultValue = [{number: "0", operation: null}];
export const MyContext = createContext(defaultValue);