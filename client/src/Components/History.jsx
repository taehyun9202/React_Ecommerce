import React, { useState ,useEffect} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import Cookies from 'js-cookie';

const History = (props) => {
    const [record, setRecord] = useState([]);

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
    else{
        navigate('/signIn')
        window.location.reload(false);
    }
    ///////////////////////////////////////////
    const fetchProducts = () =>{
        axios.get(`http://localhost:8000/api/history/${userinfo._id}`)
            .then(res => {setRecord(res.data)
            console.log(res.data)})
            .catch(err => {
                console.log(err)
                navigate('/signIn')
            });
    }
    useEffect(()=>{
        if(Cookies.get('userInfo')){
            fetchProducts();
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

    return(
        <div className="container">
            {
                record.map(a=>
                    // <p>ordered at {a.createdAt}</p>
                    <div style={{position:"relative", display:"block", marginBottom:"50px"}}>
                        <div style={{borderBottom:"black solid 1px"}}>
                            <h1 style={{display:"inline-block", fontWeight:"bolder"}}>Ordered Placed: {a.createdAt}</h1>
                            {a.shipped == false ? 
                            <h1 style={{display:"inline-block", float:"right",}}>Not Shipped Yet</h1>:
                            <h1 style={{display:"inline-block", float:"right",}}>Shipped</h1>
                            }
                        </div>
                    {a.item.map(b=>
                        <div style={{borderBottom:"black solid 1px", backgroundColor:"#f2efe8"}}>
                            <div style={{display:"inline-block"}}>
                            <Link to={"/itemid/"+b.productID}><img src={b.img} style={{width:"150px",height:"150px",display:"inline-block"}}/></Link>
                            </div>
                            <div style={{display:"inline-block", verticalAlign:"top"}}>
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
export default History;