import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate()

    
    const ClickSignUp = () =>{
        
        navigate("/signUp");


    };
    const ClickSignIn = () =>{
        navigate("/signIn");
    };


    return (
        <div>
            <img></img>
            <h1>Welcome to EnviroAction! Report green!</h1>
            <h3>We help you create a personalized plan to support the environment in your own way.
                We show you the best places to buy things like trees or solar panels, and we help you build a financial plan to reach your goals.  </h3>
            <button onClick={ClickSignUp}> Sign Up</button>
            <button onClick={ClickSignIn}> Sign In</button>
        </div>


    );
}
export default LandingPage;