import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import MathJaxRender from "./MathJaxRender"; 
import { Link } from 'react-router-dom';
const Navbar = ({ setSearchTerm, setTest , isScrolled }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [terms, setTerms] = useState([]);
  const [inputValue, setInputValue] = useState(''); 
  const navigate = useNavigate(); 



  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/term`);
        setTerms(response.data.data);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };
    setInputValue('');
    fetchTerms();
  }, []);



  const data = [
        'Échantillon', 'Population', 'Moyenne', 'Médiane', 'Mode',
        'Distribution', 'Régression', 'Corrélation', 'Estimation',
        'Fréquence', 'Série', 'Cohorte', 'Biais', 'Variance',
        'ANOVA', 'Densité', 'Coefficient', 'Effectif', 'Répartition',
        'Loi', 'Intersection', 'Hypothèse', 'Proportion', 'p-value',
        'Union', 'Aléatoire', 'Modèle', 'Marge', 'Covariance','Invariant',
        'Centile', 'Normalisation', 'Probabilité', 'Ensemble',
        'Écart-type', 'Causalité', 'Kurtosis', 'Récurrence','Ecart-Type',
        'Paramètre', 'Lissage', 'Bootstrap', 'Inférence','Causalite',
        'Échelle', 'Statistique', 'Sondage' ,'Paramètre','Recurrence','Estimateur',
        'Marge', 'Modele','Variable',
  ]
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update local input value
    setSearchTerm(value); // Update search term in parent component

    if (value) {
      const filteredSuggestions = terms
        .filter(item => item.term.toLowerCase().includes(value.toLowerCase()))
        .map(item => item.term)
        .slice(0, 5);
      
      // const filteredSuggestions = data
      // .filter(item => item.toLowerCase().includes(value.toLowerCase())) // Filter using `data`
      // .slice(0, 5);
    
      // Add a formula suggestion with $$ around
      if (value.includes('=')) {
        const formulaSuggestion = `$$${value}$$`; // Wrap formula with $$
        filteredSuggestions.unshift(formulaSuggestion); // Add as the first suggestion
      }

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.replace(/^\$\$|\$$/g, '')); // Remove $$ for input
    setSearchTerm(suggestion); // Update search term in parent component
    setTest(suggestion); // Update test with the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
    // Navigate to the new route based on the suggestion
    navigate(`${process.env.REACT_APP_DOMAIN_URL}/${suggestion.replace(/^\$\$|\$$/g, '')}`);

  };


  return (
    <nav className=" navbar navbar-expand-lg position-sticky top-0 m-0 p-0" style={{
     // backgroundColor: isScrolled ? 'rgb(3, 38, 70)' : 'transparent', 
      //backgroundColor: isScrolled ? 'greenyellow' : 'greenyellow', 
      color: isScrolled ? '#fff' : 'transparent', 
      zIndex:1000
    }}>
    
      <div className="container-fluid d-flex w-100 justify-content-around">
        <div className='gap-4 d-flex'>
          <img src={`/images/logo.png`} width={70} alt="" className='object-cover'/>
      
          <Link to={"/"} type="button" className="navbar-brand text-white text-decoration-none">
                    <span className="bg-success fs-2 p-1 text-white">Dict</span>
                      <span className=""
                      style={{
                         color: isScrolled ? '#fff' : '#000', 
                      }}>Stat</span>
              </Link>
        </div>
        <div className="position-relative">
          <div className="input-group flex-nowrap">

            <input
              type="text"
              className="form-control"
              placeholder="Recherche ..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <span className="input-group-text text-info" id="addon-wrapping"><i className='bi bi-search'></i></span>

          </div>
          
        <div>
            {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.includes('$$') ? (
                        <MathJaxRender formula={suggestion} /> // Render formula with LaTeX
                      ) : (
                        suggestion // Display term as text
                      )}
                    </li>
                  ))}
                </ul>
              )}
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
