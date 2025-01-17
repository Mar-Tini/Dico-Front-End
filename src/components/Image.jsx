import React from "react";
const Image = ({ imageUrl }) => {
 
    return (
        <>
       <div
            style={{
                width: '400px', // Taille fixe
                height: '250px', // Taille fixe
                position: 'relative', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
            
            }}
        >
            <img
                src={imageUrl}
                alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain', // Maintient les proportions
                }}
            />
            <div
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat:'no-repeat', 
                    backgroundPosition: 'center',
                    transform: 'perspective(40px) rotateX(15deg)',
                    position: 'absolute',
                    top: '80%',
                    left: '0',
                    display: 'block',
                    width: '100%',
                    height: '70%',
                    opacity: '0.5',
                    filter: 'blur(2px)',
                }}
            ></div>
        </div>

        </>
    )
}

export default Image;  