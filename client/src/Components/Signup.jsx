import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import Cookie from 'js-cookie';

const SignUp = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");
    const [userin, setUser] = useState({});

    const register = e => {
        e.preventDefault();
        const address = [street, city, postal, country]
        const user = { firstName, lastName, email, address, password, confirmPassword };
        axios.post("http://localhost:8000/api/signUp", user, {
        withCredentials: true
        })
        .then( res => {
            console.log(res);
            if(res.data.loggedIn) {
                userin = user;
                Cookie.set('userInfo', userin)
                navigate("/");
                window.location.reload(false);
            } else {
            setErrors(res.data.errors);
            }
        }).catch( err => console.log(err) );
    }
    return (
        <div className="container" >
            <div className="SignUp" >
                <h1 className="title">Sign Up</h1>
                <div style={{border:"1px solid #f2efe8"}}></div>
                <br/>
                <div>
                    <form onSubmit={ register }>
                        <input type="text" placeholder="Enter First Name" className="input" onChange={e => setFirstName(e.target.value)} />
                        {
                            errors.firstName ? 
                            <p class="help is-danger">{errors.firstName.message}</p> : true
                        }
                        <br/><br/>
                        <input type="text" placeholder="Enter Last Name" className="input" onChange={e => setLastName(e.target.value)} />
                        {
                            errors.lastName ? 
                            <p class="help is-danger">{errors.lastName.message}</p> : true
                        }
                        <br/><br/>
                        <input type="text" placeholder="Enter Email Address" className="input" onChange={e => setEmail(e.target.value)} />
                        {
                            errors.email ? 
                            <p class="help is-danger">{errors.email.message}</p> : true
                        }
                        <br/><br/>
                        <input type="text" placeholder="Enter Street" className="input" onChange={e => setStreet(e.target.value)} />
                        <br/><br/>
                        <input type="text" placeholder="Enter City" className="input" onChange={e => setCity(e.target.value)} />
                        <br/><br/>
                        <input type="text" placeholder="Enter Zip Code" className="input" onChange={e => setPostal(e.target.value)} />
                        <br/><br/>
                        <input type="text" placeholder="Enter Country" className="input" onChange={e => setCountry(e.target.value)} />
                        <br/><br/>
                        <input type="password" placeholder="Enter Password" className="input" onChange={e => setPassword(e.target.value)} />
                        {
                            errors.password ? 
                            <p class="help is-danger">{errors.password.message}</p> : true
                        }
                        <br/><br/>
                        <input type="password" placeholder="Confirm Password" className="input" onChange={e => setConfirmPassword(e.target.value)} />
                        {
                            errors.confirmPassword ? 
                            <p class="help is-danger">{errors.confirmPassword.message}</p> : true
                        }
                        <br /><br />
                        <button style={{width:"100%", backgroundColor:"#f2efe8", color:"black"}} className="button is-info" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignUp;

