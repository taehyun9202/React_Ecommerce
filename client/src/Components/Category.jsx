import React, { useState ,useEffect} from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import './style/search.css';
import Cookies from 'js-cookie';

const Search = (props) => {
    const [items, setProducts] = useState([]);
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
    const fetchProducts = () =>{
        axios.get("http://localhost:8000/api/products")
            .then(res => setProducts(res.data))
            .catch(err =>console.log(err));
    }
    useEffect(()=>{
        fetchProducts();
    },[])

    return(
        <div className="container">
            {
                items.filter( a => a.category.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes(props.category)).map(a=>
                    true? 
                    <Link to={`/itemid/${a._id}`}>
                        <div className="item">
                        <img className="image" src={a.img} />
                        <p style={{paddingLeft:"10px"}}><span style={{fontFamily:"arial black", fontWeight:"bolder"}}>[{a.brand}]</span> {a.name}</p>
                        <div>
                            <p style={{paddingRight:"10px",textAlign:"right", position:"relative",bottom:"0px"}}>${a.price}</p>
                            <p style={{paddingRight:"10px",textAlign:"right", position:"relative",bottom:"0px"}}>{a.rate}</p>
                        </div>
                        <div className="bot">
                            <p style={{paddingLeft:"20px"}}>reviews: 00 ・ sold: 00</p>
                        </div>
                    </div></Link>
                    : false
                )
            }
        </div>
    )
}
export default Search;