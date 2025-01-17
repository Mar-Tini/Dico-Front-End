import React, { useEffect } from "react";

const MathJaxRender = ({ formula }) => {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset(); // Ask MathJax to process the formulas
    }
  }, [formula]);

  return <div>{formula}</div>;
  // return (
  //   <div 
  //       dangerouslySetInnerHTML={{__html: formula}}
  //       style={{fontSize: '1.2rem'}}
  //   >
  //   </div>
  // )
};

export default MathJaxRender;
