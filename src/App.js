import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Statistique from "./pages/Statistique";

function MainApp({ setTest, setSearchTerm, test, data, isScrolled, statisticalTermScrolled, setStatisticalTermScrolled }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {location.pathname !== "/" && (
        <>
              <Navbar 
                setTest={setTest} 
                setSearchTerm={setSearchTerm} 
                isScrolled={isScrolled || statisticalTermScrolled} 
              />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home  setTest={setTest} setSearchTerm={setSearchTerm} />} />
        <Route path={`/${process.env.REACT_APP_DOMAIN_URL}/:pTerme`}  element={<Statistique  />} />
        <Route path={`/${process.env.REACT_APP_DOMAIN_URL}/:pTerme/:titreId`} element={<Statistique />} />
      </Routes>
    </>
  );
}

 

function App({ tr }) {
  const [test, setTest] = useState("Population");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData();

  }, [test]);

  const fetchData = () => {
    fetch("http://localhost:8000/api/dico/")
      .then((response) => response.json())
      .then((result) => {
        if (result.termes && result.termes.values && result.termes.values[test]) {
          setData(result.termes.values[test]);
        }
      })
      .catch((error) => console.error("Erreur lors du chargement des données :", error));
  };

  return (
    <Router>
      <MainApp 
        setTest={setTest} 
        setSearchTerm={setSearchTerm} 
        test={test} 
        data={data} 
      />
    </Router>
  );
}

export default App;