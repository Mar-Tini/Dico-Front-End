import React, { useState, useRef, useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
const Info = ({ data , pTerme , titres}) => {
    
    const [activeTab, setActiveTab] = useState(null); // null means no tab is active initially
    const dropdownRef = useRef(null); // Ref for the dropdown content
    const navigate = useNavigate();
  
    const handleTabClick = (tab) => {
        setActiveTab((prevTab) => (prevTab === tab ? null : tab)); // Toggle content visibility
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActiveTab(null); // Close the dropdown if clicked outside
        }
    };


    useEffect(() => {

       
        // Vérifie si titres est vide ou si un titre est null
        if (!titres || titres.length === 0 || titres.some((titre) => !titre.titre)) {
            // Redirige vers la page d'accueil
            navigate('/');
        }

        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

        
    }, [titres, navigate]);

    return (
        <>
         {titres.sort((a, b) => (a.titre).localeCompare(b.titre)) && titres.length > 0 ? (
        <>
            <div
            className="w-100 mb-4"
            style={{
                backgroundColor: 'rgb(3, 38, 70)',
                color: '#fff',
            }}
            >
            <nav className="d-flex container gap-4 align-items-center justify-content-between"
                style={{padding:'15px'}} >
                    
                {/* Afficher les trois premiers titres */}
               <div className="d-flex  gap-4"  id="myTab" role="tablist">
                {titres.slice(0, 3).map((titre) => (
                    <Link
                        to={`/${process.env.REACT_APP_DOMAIN_URL}/${pTerme}/${titre.id}`}
                        key={titre.id}
                        type="button"
                        className="text-white text-decoration-none menu"
                    >
                        {titre.titre}
                    </Link>
                    ))}
               </div>

                {/* Menu déroulant pour les titres supplémentaires */}
               <div>
               {titres.length > 3 && (
                <div className="dropdown">
                    <button
                    className="btn btn-secondary dropdown-toggle  "
                    style={{width:'150px'}}
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                   Voir plus
                    </button>
                        <ul className="dropdown-menu m-0 p-0" style={{width:'200px'}} aria-labelledby="dropdownMenuButton">
                        {titres.slice(3).map((titre) => (
                            <li key={titre.id} className="m-0 p-0 " style={{width:'200px',}}>
                            <Link
                                to={`/${process.env.REACT_APP_DOMAIN_URL}/${pTerme}/${titre.id}`}
                                className="dropdown-item p-2 "
                            >
                                {titre.titre}
                            </Link>
                            </li>
                        ))}
                    </ul>
                </div>  
                )}
               </div>
            </nav>
            </div>
        </>
        ) : null}

        </>
    );
};

export default Info;

