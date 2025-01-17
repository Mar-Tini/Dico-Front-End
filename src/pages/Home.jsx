import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Accueil.css';
import { useNavigate } from 'react-router-dom';
import MathJaxRender from '../components/MathJaxRender';
import { motion } from 'framer-motion';

const Home = ({ setSearchTerm, setTest }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [terms, setTerms] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const [datas, setDatas] = useState([]);

    const [imageUrl, setImageUrl] = useState(null);
    // Le nom de l'image reste fixe, mais l'extension peut changer
  

    useEffect(() => {

        fetchTerms();
        generateImageUrl();

    }, [imageUrl]);

  
    const generateImageUrl = async () => {
          
            try {
                const response = await fetch(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/logo-image`);

                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL}${data.url}`); // Définit l'URL de l'image
                  
                  
                } 
            } catch (error) {
               
            }
    };


    const fetchTerms = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/term`);
            setTerms(response.data.data);
        } catch (error) {
            console.error('Error fetching terms:', error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setSearchTerm(value);
        if (value) {
            const filteredSuggestions = terms
                .filter(item => item.term.toLowerCase().includes(value.toLowerCase()))
                .map(item => item.term)
                .slice(0, 2);

            if (value.includes('=')) {
                const formulaSuggestion = `$$${value}$$`;
                filteredSuggestions.unshift(formulaSuggestion);
            }

            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (inputValue.trim() === '') {
        
            return; 
        }
        const sanitizedSuggestion = suggestion.replace(/^\$\$|\$$/g, '');
        setInputValue(sanitizedSuggestion);
        setSearchTerm(sanitizedSuggestion);
        setTest(sanitizedSuggestion);
        setSuggestions([]);
        navigate(`${process.env.REACT_APP_DOMAIN_URL}/${sanitizedSuggestion}`);
    };

    return (
        <div className="statistical-term"
            style={{
                zIndex: '1000',
                width: '100vw',
                height: '100vh',
                overflowY: 'scroll',
            }}
        >
            <div
                style={{ minHeight: '100vh' }}
                className='d-flex justify-content-between align-items-center'
            >
                <div className="bg-white"
                    style={{
                        width: '30rem',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={imageUrl}
                        alt=" "
                        className="image-cover p-4"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </div>

                <div className='' style={{
                    height: '100vh',
                    width: '60vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    backgroundColor: 'rgb(3, 38, 70)',
                    paddingTop:'100px'
                }}>
                    <div>
                        {/* Animated Text */}
                        <motion.h2
                            className='fs-1 text-white  dictionary-container'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                             <span className='' style={{  fontFamily: 'serif' }}>B</span>ienvenue
                        </motion.h2>
                        <motion.p
                            className='fs-1 m-4 dictionary-container'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className='d-flex justify-content-center align-items-end'>
                                <span className='text-success' style={{ fontSize: '4rem', fontFamily: 'serif' }}>D</span>
                                <span className='text-white'> ictionnaire</span>
                            </div> 
                           <div className='d-flex justify-content-end'>
                           
                                <span className='text-success' style={{ fontSize: '4rem', fontFamily: 'serif' }}>S</span>
                                <span className='text-white'> tatistique</span>
                            
                           </div>
                        </motion.p>

                        <div className="input-group flex-nowrap" style={{ width: '760px' }}>
                            <input
                                type="text"
                                className="form-control p-2 fs-5"
                                placeholder="Recherche .  .  ."
                                value={inputValue}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="input-group-text bg-success fs-4" style={{ cursor: 'pointer' }}
                                onClick={() => handleSuggestionClick(inputValue)}>
                                <i className='text-white bi bi-search'></i><span className='text-white '>Recherche</span>
                            </span>
                        </div>

                        {suggestions.length > 0 && (
                            <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item list-group-item-action w-25"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.includes('$$') ? (
                                            <MathJaxRender formula={suggestion} />
                                        ) : (
                                            suggestion
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
