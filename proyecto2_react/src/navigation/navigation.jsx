//Aquí vamos a definir la navegación de nuestro portafolio
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import App from "../App";


export default function Navigation(){
    return(
        <BrowserRouter>
          
            <Routes>
                <Route path="/" element={<App/>}/>
            </Routes>
           
        </BrowserRouter>
    )
}
