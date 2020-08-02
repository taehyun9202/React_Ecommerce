import React, { useState ,useEffect} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import './style/Cart.css';
import Cookies from 'js-cookie';

const Cart = props => {
    const [quantity, setQuantity] = useState(1);
    const [productID, setProductID] = useState(props._id);
    
    const [list, setList] = useState([]);

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

    const fetchCart = () =>{
        axios.get(`http://localhost:8000/api/carts/${userinfo._id}`,{
            withCredentials: true
        })
            .then(res => setList(res.data))
            .catch(err =>{console.log(err)});
    }
    useEffect(()=>{
        if(Cookies.get('userInfo')){
            fetchCart();
        }
    },[])
    var sum = 0;
    
    const extra = (price, option) => {
        if(option.includes("$") === false){return price;}
        else{
          var sign = option.lastIndexOf("$")
          var extraprice = Number(option.slice(sign+1,option.length));
          return price+extraprice
        }
    }
    
    list.map(a =>
        sum += extra(a.price, a.selected) * a.quantity
    )
    const remove = (e,_id) =>{
        console.log(_id);
        axios.delete(`http://localhost:8000/api/carts/${_id}`,{
            withCredentials: true
            })
        .then(res => {
            navigate("/user/cart")
            window.location.reload(false);
        })
        .catch(err =>console.log(err));
    }

    const changeQuantity = (id,name,productID,brand,img,price,selected,inStock,quantity) => {
        // e.preventDefault();
        if(quantity == 0){
            alertYN(null, id)
        }
        const IteminCart = {name,productID,brand,img,price,selected,inStock,quantity};
        axios.put(`http://localhost:8000/api/carts/${id}`, IteminCart ,{
        withCredentials: true
        })
            .then(res =>{
                    navigate("/user/cart")
                    window.location.reload(false);
            })
            .catch(err => console.log(err));
    }

    const alertYN = (e, id) => {
        var r = window.confirm("Do you want to remove this item?");
        if (r === true) {
          remove(e,id);
        }
      }

    const proccedtoCheckout = () => {
        if(list.length == 0){
        alert("Cart is Empty!")
        } else{
            navigate("/user/shipping")
        }
    }
    return (
        <div className="container">
            <div className="cartLeft">
            {
                list.map(a=>
                    <div style={{height:"120px",position:"relative", display:"block", backgroundColor:"#f2efe8", marginBottom:"10px"}}>
                        <Link to={"/itemid/"+a.productID}><img src={a.img} style={{width:"110px",height:"100%",display:"inline-block"}}/></Link>
                        <div style={{display:"inline-block", verticalAlign:"top", paddingLeft:"10px",paddingRight:"15px",width:"calc(100% - 110px)"}}>
                            <h1 style={{display:"inline-block", fontWeight:"bolder"}}>[{a.brand}]{a.name} {a.selected}</h1>
                            <img onClick={e=> alertYN(e,(a._id))} src={"https://cdn2.iconfinder.com/data/icons/cleaning-19/30/30x30-10-512.png"} style={{width:"23px",display:"inline-block", right:"5px",top:"3px", position:"absolute"}}/>
                            <h1 style={{position: "absolute", bottom:"35px"}}>Quantity</h1>
                            <div style={{position: "absolute",bottom: "10px",width:"calc(100% - 135px)"}}>
                                <input onChange={e=>setQuantity(e.target.value, changeQuantity(a._id,a.name,a.productID,a.brand,a.img,a.price,a.selected,a.inStock,e.target.value))}
                                type="number" defaultValue={a.quantity} max={a.inStock} style={{textAlign:"right", width:"50px"}} />
                                <div style={{float:"right"}}>
                                    <h1>$ {extra(a.price, a.selected) * a.quantity}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
            <div className="cartRight" style={{position:"absolute"}}> 
                <h1 className="title">Total</h1>
                <div style={{border:"1px solid rgba(42, 42, 42, 1)", marginBottom:"15px"}}></div>
                <h3>Number of Items: <span style={{float:"right"}}>{list.length}</span></h3>
                <div>Total Amount: <span style={{float:"right"}}>${sum}</span></div>
                <div style={{border:"1px solid rgba(42, 42, 42, 1)", marginBottom:"15px"}}></div>
                <button onClick={proccedtoCheckout} className="button" style={{width:"100%",color:"white", backgroundColor:"rgba(42, 42, 42, 1)", marginBottom:"20px"}}>Proceed to CheckOut</button>
            </div>
        </div>
    )
}
export default Cart;
