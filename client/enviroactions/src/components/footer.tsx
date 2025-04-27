import React, { useState } from "react";
import "../styles/footer.css"

function Footer() {
  const adresse = "guibnation999@enviroaction.qc.ca";

  const copyAdresse = () => {
    navigator.clipboard.writeText(adresse).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div id="footer">
      <p id="footerleft" onClick={copyAdresse}> Contact Us: @guibnation999</p>
      <p id="footerright" >COPYRIGHT Guib Inc © 2025</p>
    </div>
  );
}

export default Footer;
