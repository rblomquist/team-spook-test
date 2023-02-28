import { useState } from "react";
import { LoginForm } from "./components/Login/LoginForm";
import { OAuth } from "./components/OAuth/Oauth";
import { SignupForm } from "./components/Singup/SingUpForm";

export const Init = () => {
    const [displayLogin,setDisplayLogin]=useState(true)
    const [displaySingUp,setDisplaySingUp]=useState(false)

    const onClick=()=>{
        setDisplayLogin(!displayLogin)
        setDisplaySingUp(!displaySingUp)
    }
  return (
    <section className="Init">
      <div className="Init_Buttons">
        <button className="button Buttons_Login" onClick={onClick}>Login</button>
        <button className="button Buttons_SingUp" onClick={onClick}>Sing Up</button>
      </div>
      <div>
        {displayLogin && <LoginForm />}
        {displaySingUp && <SignupForm />}
      </div>
      <OAuth/>
    </section>
  );
};
