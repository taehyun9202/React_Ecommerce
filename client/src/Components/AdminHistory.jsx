import React, { useState ,useEffect} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import './style/Cart.css';
import Cookies from 'js-cookie';

const AdminHistory = props => {
    const [list, setList] = useState([]);
    const [shipped , setShipped] = useState(false);
    const [historyID , setHistoryID] = useState("");

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



    const fetchHistory = () => {
        axios.get(`http://localhost:8000/api/history`)
            .then(res => setList(res.data))
            .catch(err =>{console.log(err)});
    }
    useEffect(()=>{
        if(Cookies.get('userInfo')){
            fetchHistory();
        }
    },[])

    const extra = (price, option) => {
        if(option.includes("$") === false){return price;}
        else{
          var sign = option.lastIndexOf("$")
          var extraprice = Number(option.slice(sign+1,option.length));
          return price+extraprice
        }
    }
    
    const ShipItem = (id) => {
        console.log(id)
        const shipped = true
        const history = {shipped,id};
        console.log(history)
        axios.put(`http://localhost:8000/api/history/${id}`, history)
        .then(res =>
            console.log(res))
        .catch(err => console.log(err));
    }
    return (
        <div className="container">
            {
                list.map(a=>
                    // <p>ordered at {a.createdAt}</p>
                    <div style={{position:"relative", display:"block", marginBottom:"50px"}}>
                        <div style={{borderBottom:"black solid 1px"}}>
                            <h1 style={{fontWeight:"bolder"}}>Order ID : {a._id}</h1>
                            <h1 style={{display:"inline-block", fontWeight:"bolder"}}>Ordered Placed: {a.createdAt}</h1>
                            <p>hiiii{a._id}</p>
                            <form onSubmit={ShipItem(a._id)}>
                            {a.shipped === false ?
                                <button style={{display:"inline-block", float:"right", marginTop:"-25px"}}>Ship</button> :
                                <p style={{display:"inline-block", float:"right", marginTop:"-25px"}}>Shipped</p>
                            }
                            </form>
                        </div>
                    {a.item.map(b=>
                        <div style={{borderBottom:"black solid 1px", backgroundColor:"#f2efe8"}}>
                            <div style={{display:"inline-block"}}>
                            <Link to={"/itemid/"+b.productID}><img src={b.img} style={{width:"150px",height:"150px",display:"inline-block"}}/></Link>
                            </div>
                            <div style={{display:"inline-block", verticalAlign:"top"}}>
                                <h1>UserID: {b.getuserID}</h1>
                                <h1 style={{fontWeight:"bolder"}}>[{b.brand}] {b.name} {b.selected}</h1>
                                <p>Quantity: {b.quantity}</p>
                                <p>$ {extra(b.price, b.selected) * b.quantity}</p>
                            </div>
                        </div>
                    )
                    }
                    </div>
                )
            }
        </div>
    )
}
export default AdminHistory;
