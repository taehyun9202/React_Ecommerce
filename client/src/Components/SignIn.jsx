import React , { useState } from 'react';
import { Link, navigate } from '@reach/router';
import 'bulma/css/bulma.min.css';
import axios from 'axios';
import Cookie from 'js-cookie';

const SignIn = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const login = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/signIn", {email, password}, {
        withCredentials: true
    })
        .then( res => {
        console.log(res.data);
        if(res.data.loggedIn) {
            Cookie.set('userInfo', res.data.user)
            navigate("/");
            window.location.reload(false);
        } else {
            setErrorMessage("Invalid login attempt!");
        }
        }).catch( err => console.log(err) );
    }
    return (
        <div className="container" >
            <div className="SignIn">
                <h1 className="title">Sign In</h1>
                {/* {userid ? <p>{userid}</p>: false} */}
                <div style={{border:"1px solid #f2efe8", width:"350px"}}></div>
                <br/>
                <div style={{display:"inline-block"}}>
                    <form onSubmit={ login }>
                        <div style={{display:"inline-block"}}>
                            <input onChange={e => setEmail(e.target.value)} className="input" type="email" placeholder="Enter Email Address"/>
                            <br/><br/>
                            <input onChange={e => setPassword(e.target.value)} className="input" type="password" placeholder="Enter Password"/>
                        </div>
                        <button style={{display:"inline-block",verticalAlign:"top", fontFamily:"Arial Black"}} className="signInButton" type="submit">Sign In</button>
                    </form>
                </div>
                <br/><br/>
                <Link to="/signUp"><h1 style={{float:"right",paddingRight:"26px"}}>Don't Have Account Yet?</h1></Link>
            </div>
        </div>
    )
}
export default SignIn;
