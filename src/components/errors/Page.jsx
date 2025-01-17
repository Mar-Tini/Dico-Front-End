import React from "react";
import { Link, useParams } from "react-router-dom";

const Page = () => {
    const {pTerme} = useParams(); 
    return (
        <>
            <div style={
                {
                    display:'flex', 
                    justifyContent:"center", 
                    alignContent:'center',
                    height:'90vh',
                    width:'100%', 
                    backgroundColor: 'rgb(3, 38, 70)', 
                }
            }>
               <div style={{width:"100vw"}} className="m-4 p-4 text-center  d-flex justify-content-center align-items-center">
                    <div>
  
                      <h1 className="text-white ">Erreur 404  </h1>
                     <p className="text-white mt-4">Donnée est introvable pour  : {pTerme}</p>
                     <Link to={'/'} className="text-white text-center hover:text-blue-500">se rediger à la page s'acceuille</Link>

                    </div>
               </div>
            </div> 
        </>
    ); 
}

export default Page; 