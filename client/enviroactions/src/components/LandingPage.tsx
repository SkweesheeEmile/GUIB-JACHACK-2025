import React, { useState } from "react";


function LandingPage() {
    
    const ClickSignIn = async () =>{
        
        window.location.href = '/signin';

    };
    const ClickLogIn = async () =>{
        
        window.location.href = '/login';

    };


    return (
        <div>
            <image></image>
            <h1>Welcome to EnviroAction! Report green!</h1>
            <h3>We help you create a personalized plan to support the environment in your own way.
                We show you the best places to buy things like trees or solar panels, and we help you build a financial plan to reach your goals.  </h3>
            <button onClick={ClickSignIn}> Sign In</button>
            <button onClick={ClickLogIn}> Log In</button>
        </div>


    );
}
export default LandingPage