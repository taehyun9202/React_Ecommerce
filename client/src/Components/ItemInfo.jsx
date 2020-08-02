import React, { useState, useEffect } from 'react';
import { Link, navigate} from '@reach/router';
import 'bulma/css/bulma.min.css';
import './style/ItemInfo.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const ItemInfo = props => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState(0);

    const [options, setOptions] = useState("")
    
    const [selected, setSelected] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [productID, setProductID] = useState(props._id);
    
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

    const getProduct = () => {
        axios.get(`http://localhost:8000/api/products/${props._id}`)
            .then( res => {
                // console.log(res.data)
                setName(res.data.name);
                setBrand(res.data.brand);
                setCategory(res.data.category);
                setImg(res.data.img);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setInStock(res.data.inStock);
            })
            .catch( err => console.log(err));
    }

    const getOptions = () => {
        axios.get(`http://localhost:8000/api/options/${props._id}`)
            .then( res => {
                setOptions(res.data);
            })
            .catch( err => console.log(err));
    }
    if(Cookies.get('userInfo')){
    const getuserID = userinfo._id
    console.log(getuserID)
    }

    const addtoCart = e => {
        e.preventDefault();
        if(Cookies.get('userInfo')){
        const getuserID = userinfo._id
        const List = {getuserID,name,productID,brand,img,price,selected,inStock,quantity};
        console.log("List:",List)
        axios.post("http://localhost:8000/api/carts", List)
            .then(res =>{
                console.log(res.data)
                window.location.reload(false);
            })
            .catch( err => console.log(err));
        }
        else{
            navigate('/signIn')
        }
    }
    const BuyNow = e => {
        e.preventDefault();
        if(Cookies.get('userInfo')){
        const getuserID = userinfo._id
        const List = {getuserID,name,productID,brand,img,price,selected,inStock,quantity};
        console.log("List:",List)
        axios.post("http://localhost:8000/api/carts", List)
            .then(res =>{
                console.log(res.data)
                navigate("/user/cart")
                window.location.reload(false);
            })
            .catch( err => console.log(err));
        }
        else{
            navigate('/signIn')
        }
    }

    
    useEffect(()=>{
        getProduct();
        getOptions();
    },[]);
    
    const extra = (price, option) => {
        if(option.includes("$") === false){return price;}
        else{
          var sign = option.lastIndexOf("$")
          var extraprice = Number(option.slice(sign+1,option.length));
          return price+extraprice
        }
    }
    const getKey = selected => {
        var period = selected.indexOf(".")
        var key = (selected.slice(period+1));
        return key
    }
    return (
        <div className="container">
            <div className="photo">
                <img src={img} alt=""/>
            </div>
            <div className="info" style={{marginTop:"-30px"}}>
                <small style={{float:"right", paddingRight:"25px"}}>{productID}</small><br/>
                <h1 className="title">[{brand}] {name}</h1>
                <h2 style={{fontSize:"30px"}}>$ {price}</h2>
                <h1 style={{color:"Red"}}>{inStock} left(s)</h1>
                <h1>{description}</h1>
                <br/>
                {
                options.length > 0 ?
                <div className="field">
                    <div className="control" style={{paddingRight:"10%"}}>
                        <div className="select is-fullwidth">
                        <select onChange={e => setSelected(e.target.value)}>
                            {
                                options.map((item, index)=> {
                                    return (
                                    item.extra == 0 ?
                                    <option key={index}>{item.type} </option> :
                                    <option key={index}>{item.type}  +${item.extra}</option>
                                    )
                                })
                            }
                        </select>
                        </div>
                    </div>
                </div>
                :false
                }

                <div className="quantity">
                    <div style={{height:"40px",verticalAlign:"center", paddingTop:"5px",paddingLeft:"10px",fontFamily:"Arial Black"}}>
                        <h1>{name} {getKey(selected)}</h1>
                    </div>
                    <div style={{height:"40px",verticalAlign:"center", paddingLeft:"10px"}}>
                        <input onChange={e => setQuantity(e.target.value)} style={{width:"80px",display:"inline-block", height:"35px",textAlign:"right"}} className="input" defaultValue="1" type="number" max={inStock} min="1"/>
                        <h1 style={{display:"inline-block",float:"right", paddingRight:"40px", fontFamily:"arial Black", fontSize:"20px"}}>$ {quantity == null ?extra(price,selected): extra(price,selected) * quantity}</h1>
                    </div>
                </div>


                <br/>
                <div>
                    <div className="AddCart">
                        <form onSubmit={addtoCart}>
                            <input type="hidden" value={productID} onInput={e=>setProductID(e.target.value)}/>
                            <input type="hidden" value={name} onInput={e=>setName(e.target.value)}/>
                            <input type="hidden" value={brand} onInput={e=>setBrand(e.target.value)}/>
                            <input type="hidden" value={img} onInput={e=>setImg(e.target.value)}/>
                            <input type="hidden" value={price} onInput={e=>setPrice(e.target.value)}/>
                            <input type="hidden" value={selected} onInput={e=>setSelected(e.target.value)}/>
                            <input type="hidden" value={inStock} onInput={e=>setInStock(e.target.value)}/>
                            <input type="hidden" value={quantity} onInput={e=>setQuantity(e.target.value)}/>
                            <button className="button" style={{width:"100%", backgroundColor:"#f2efe8"}}>Add Cart</button>
                        </form>
                    </div>
                    <div className="BuyNow">
                    <form onSubmit={BuyNow}>
                            <input type="hidden" value={productID} onInput={e=>setProductID(e.target.value)}/>
                            <input type="hidden" value={name} onInput={e=>setName(e.target.value)}/>
                            <input type="hidden" value={brand} onInput={e=>setBrand(e.target.value)}/>
                            <input type="hidden" value={img} onInput={e=>setImg(e.target.value)}/>
                            <input type="hidden" value={price} onInput={e=>setPrice(e.target.value)}/>
                            <input type="hidden" value={selected} onInput={e=>setSelected(e.target.value)}/>
                            <input type="hidden" value={inStock} onInput={e=>setInStock(e.target.value)}/>
                            <input type="hidden" value={quantity} onInput={e=>setQuantity(e.target.value)}/>
                            <button className="button" style={{width:"100%",color:"white", backgroundColor:"rgba(42, 42, 42, 1)"}}>Buy Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemInfo;