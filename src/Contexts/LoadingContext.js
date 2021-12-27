import {createContext} from "react";

const LoadingContext = createContext({
    isLoading: false,
    setIsLoading: (isLoading) => {}
});
export default LoadingContext;