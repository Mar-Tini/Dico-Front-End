import React from "react";
import { MathJax } from "better-react-mathjax";

const LatexRenderer = ({ text }) => {
  return (
    <MathJax>
       <div 
        dangerouslySetInnerHTML={{__html: text}}
        style={{fontSize: '1.2rem'}}
    />
    </MathJax>
  )
};

export default LatexRenderer;
