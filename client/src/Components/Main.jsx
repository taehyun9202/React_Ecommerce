import React, { useState ,useEffect} from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import Cookies from 'js-cookie';
// import jwtDecode from 'jwt-decode';
// import {Cookies} from 'react-cookie';


const Main = props => {
    const [products, setProducts] = useState([]);
    ////////////loggedinuser/////////////
    var userinfo = Cookies.get('userInfo')
    const LoggedinUserInfo = e =>{
        const UserisAdmin = e.slice((e.indexOf('isAdmin":')+9),e.indexOf(',"_id"'))
        const UserID = e.slice((e.indexOf('"_id":"')+7),e.indexOf('","firstName"'))
        const UserFN = e.slice((e.indexOf('firstName":"')+12),e.indexOf('","lastName":'))
        const UserLN = e.slice((e.indexOf('lastName":"')+11),e.indexOf('","email"'))
        const UserEmail = e.slice((e.indexOf('email":"')+8),e.indexOf('","address'))
        const UserAddress = e.slice((e.indexOf('address":[')+11),e.indexOf('],"password'))
        const LoggedinUser = {
            isAdmin: UserisAdmin,
            _id: UserID,
            firstName: UserFN,
            lastName: UserLN,
            email: UserEmail,
            address : UserAddress
        }
        userinfo = LoggedinUser
        return userinfo
    }
    if(Cookies.get('userInfo')){
    LoggedinUserInfo(Cookies.get('userInfo'))}
    ///////////////////////////////////////////

    console.log("userinfo",userinfo)
    const fetchProducts = () =>{
        axios.get("http://localhost:8000/api/products",{
            withCredentials: true
        })
        .then(res => 
            setProducts(res.data.slice(0,5))
            // console.log(res.data.loggedIn)
        )
        .catch(err =>console.log(err));
    }
    useEffect(()=>{
        fetchProducts();
    },[])
    return (
        <div className="container">
            <div>
                <h1 style={{display:"inline-block"}} className="title">E-Market <span style={{color:"#3298dc"}}>Bests</span></h1>
            </div>
            {
                products.map(a =>
                    <Link to={`/itemid/${a._id}`}><div style={{display:"inline-block",verticalAlign:"top",minWidth:"180px",maxWidth:"180px",minHeight:"272px", padding:"10px"}}>
                        <img src={a.img} style={{borderRadius:"50%", width:"150px", height:"150px", border:"3px lightgray solid"}}/>
                        <p> <span style={{fontFamily:"arial black", fontWeight:"bolder"}}>[{a.brand}]</span> {a.name}</p>
                        <div>
                            <p style={{textAlign:"right", position:"relative",bottom:"0px"}}>${a.price}</p>
                            <p style={{textAlign:"right", position:"relative",bottom:"0px"}}>{a.rate}</p>
                        </div>
                    </div></Link>
                )
            }
        </div>
    )
}
export default Main;
