import React, { useState } from "react";

function Footer(){
    const adresse = "guibnation999@enviroaction.qc.ca"

    const copyAdresse =() =>{
        navigator.clipboard.writeText(adresse)
            .catch((err) => {
            console.error('Failed to copy: ', err);
            });
    };
    

    return(
        <div>
            <p onClick={copyAdresse}> Contact Us: @guibnation999</p>
            <p>COPYRIGHT Guib Inc © 2025</p>
        </div>
    );
};

export default Footer;