import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , Link, useNavigate } from "react-router-dom";
import Info from "../components/Info";
import Page from "../components/errors/Page";
import Image from "../components/Image";
import { MathJaxContext , MathJax } from 'better-react-mathjax';

const Statistique = () => {

  const config = {
    loader: {load: ['input/tex', 'output/chtml']}, 
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']], 
      displayMath: [['$$', '$$'], ['\\[', '\\]']], 
      processEscapes: true,
    }, 
    startup: {
      typeset:false, 
    }, 
  }; 
 
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { pTerme } = useParams(); 
  const { titreId } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectekey, setSelectedkey] = useState(null); 
  const [terms, setTerms] = useState([]);
  const [error, setError] = useState(null);
  

  const [isValidImage, setIsValidImage] = useState(true);
    // Le nom de l'image reste fixe, mais l'extension peut changer
  const imageBaseName = 'default'; // Le nom de l'image sans extension
  const imageDirectory = `${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API_IMAGE}`;
  const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];


  let titreSelectionne = data?.titres.find(titre => titre.id === parseInt(titreId));

  if (!titreSelectionne && data?.titres.length > 0) {
        titreSelectionne = data?.titres[0];
  }


  const clesPourTitre = titreSelectionne  ? data?.cles.filter(cle => cle.titre_id === titreSelectionne.id) : [];

  
  useEffect(() => {
      
      fetch(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/term`)
        .then(response => response.json())
        .then(responseData => {
            const termsArray = responseData.data
                .map(item => item.term)
                .filter(term => /^[A-Z]/.test(term));
            setTerms(termsArray);
      })
      .catch(error => {
          console.error('Erreur lors du chargement des termes:', error);
      });

      fetchTerms();
      fetchImageUrl();
  
  }, [pTerme]);


  useEffect(() => {
    if (clesPourTitre && clesPourTitre.length > 0) {
      setSelectedkey(clesPourTitre[0]?.id); // Update selected key
    }
  }, [titreSelectionne, titreId, pTerme]);


  const fetchsetSelectedkey = async (id) => {
          setSelectedkey(null);
          setSelectedkey(id);
  };
  

  
  const fetchImageUrl = async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/image/${pTerme}`);
          if (response.ok) {
              const data = await response.json();

              setImageUrl(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL}${data.url}`); // Définit l'URL de l'image
            
          } else {
              generateImageUrl();// Image par défaut si non trouvée
          }
      } catch (error) {
          console.error("Error fetching image:", error);
          setImageUrl('/images/default.png');  // Image par défaut en cas d'erreur
      }
  };


  const generateImageUrl = async () => {
          
      try {
          const response = await fetch(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/default-image`);
          if (response.ok) {
              const data = await response.json();
              setImageUrl(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL}${data.url}`); // Définit l'URL de l'image
            
            
          } 
      } catch (error) {
        
      }
  };



  const fetchTerms = async () => {
    try {
         const response = await axios.get(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/test/titre/${pTerme}`);
         setData(response.data.data);

      // const imagePath = `${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API_IMAGE}/${pTerme}.png`;
      // setImageUrl(imagePath);
      
    } catch (error) {
          navigate('/')
    }

  };



  const replaceWordsWithLinks = (text) => {
    if (!text) return text;

    const words = text.split(' ');
    const linkedWords = new Set(); // Utiliser un Set pour garder les mots déjà liés

    return words.map((word, index) => {
        // Supprimer la ponctuation du mot
        const trimmedWord = word.replace(/[.,!?]/g, '');
        const lowerCasedWord = trimmedWord.toLowerCase();

        // Vérifier si le mot correspond à un terme
        const matchedTerm = terms.find(term => term.toLowerCase() === lowerCasedWord);

        if (
            matchedTerm && 
            matchedTerm.toLowerCase() !== pTerme.toLowerCase() && 
            !linkedWords.has(lowerCasedWord) // Vérifier si le mot n'a pas déjà été lié
        ) {
            linkedWords.add(lowerCasedWord); // Ajouter le mot au Set
            return (
                <Link 
                    key={index} 
                    to={`/${process.env.REACT_APP_DOMAIN_URL}/${matchedTerm}`} 
                    className="text-info text-decoration-none fs-5"
                >
                    {word}
                </Link>
            );
        }

        // Retourner le mot tel quel s'il ne doit pas être lié
        return ` ${word} `;
    });
};


  const ConentRenderer = (content) => {
  
    if (!content || typeof content !== 'string') {
        return <div>{replaceWordsWithLinks(content)}</div>
    }

    const isMathJaxFormule = content.includes("$") || content.includes("\\(") || content.includes("\\["); 
      if(isMathJaxFormule){
        return (
          <MathJaxContext config={config}> 
            <MathJax>
               <div className="">
                    { content }
               </div>
            </MathJax>
        </MathJaxContext>
        
        )
      }else{
        return <div>{replaceWordsWithLinks(content)}</div>
      }
  }
  

  const ConentRendererContent = (content) => {
  
    if (!content || typeof content !== 'string') {
        return <div>{replaceWordsWithLinks(content)}</div>
    }

    const isMathJaxFormule = content.includes("$") || content.includes("\\(") || content.includes("\\["); 
      if(isMathJaxFormule){
        return (
          <MathJaxContext config={config}> 
            <MathJax>
               <div className="d-flex justify-content-center align-items-center" >
                  <p
                   className="p-4 text-black shadow text-center"
                   style={{
                      border: '.1rem solid green', 
                      borderRadius:'5px',
                  }}>
                     { content }
                    </p>
               </div>
            </MathJax>
        </MathJaxContext>
        
        )
      }else{
        return <div>{replaceWordsWithLinks(content)}</div>
      }
  }


  if (!data) return  <>Chargement ...........</>;


  return (
    <div>
  
      <Info titres={data.titres} pTerme={pTerme} />
   
    <section className='d-flex m-4 p-4 w-100 justify-content-evenly align-items-start'>
    
        <Image imageUrl={imageUrl} />
      

        <div className=""  style={{
          height:'70vh',
          maxWidth:'700px', 
          minWidth:'700px', 
          overflowY:'scroll',
          overflowX:'hidden' , 
          //backgroundColor: 'rgb(3, 38, 70)', 
        }}>

                {titreSelectionne ? (
                  <>
                 <div className="d-flex gap-4 " style={{
                    width:'100%',
                    display:'flex', 
                    flexWrap:'wrap',
                 
                  }}>
                   {clesPourTitre.length > 0 ? (
                        clesPourTitre.sort((a, b) => (a.cle).localeCompare(b.cle)).map((cle, index) => (
                                <div key={cle.id}>
                                    <div className="">
                                        <button 
                                            className={`btn  text-center fs-5 p-2 m-2 shadow ${selectekey === cle.id ? ' border-primary ' : 'boder-none'}`} 
                                         
                                            style={{
                                              borderBottom: '.3rem solid green', 
                                              minWidth:'350px', 
                                              minWidth:'300px', 
                                              width:'auto',
                                              cursor:'pointer',
                                           
                                          }}
                                          key={index} onClick={()=> fetchsetSelectedkey(cle.id)}>
                                            {cle.cle}
                                        </button>


                                    </div>
                                  </div>
                            ))
                          ) : (
                            <p>Aucune contenus associée à ce titre.</p>
                          )}
                    </div>
                          {
                            selectekey && (
                              <>
                                <div className="m-4 gap-4">
                                    <div className="m-4 text">
                                      <p>
                                        {
                                          ConentRendererContent(clesPourTitre.find(item => item.id === selectekey)?.contente )
                                        }
                                      </p>
                                    </div>
                                    <div className="m-4 text">
                                       <p>
                                          {
                                            ConentRenderer(clesPourTitre.find(item => item.id === selectekey)?.contente1 )
                                          }
                                      </p>
                               
                                    </div>
                                    <div className="m-4 text">
                                      <p>
                                          {
                                            ConentRenderer(clesPourTitre.find(item => item.id === selectekey)?.contente2 )
                                          }
                                      </p>
                                    </div>
                                   
                                    {/* <div className="m-4">
                                      
                                       <ConentRenderer content= {clesPourTitre.find(item => item.id === selectekey)?.contente1 }   /> 
                                    </div>
                                 
                                    <div className="m-4">
                                       
                                       <ConentRenderer content= {clesPourTitre.find(item => item.id === selectekey)?.contente2 }   /> 
                                    </div> */}
                                </div>
                              </>
                            )
                          }
                  </>
        ) : (
          <Page />
        )}
                  
                  </div>
      </section>
    </div>
  );
};

export default Statistique;
