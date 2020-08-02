import React, { useState ,useEffect} from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminItem = props => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState("")
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState(0);

    const [itemid, setItemId] = useState("")

    const [type, setType] = useState("")
    const [extra, setExtra] = useState(0)

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

    const addProduct = e => {
        e.preventDefault();
        const Product = {name,brand,category,img,price,description,inStock};
        axios.post("http://localhost:8000/api/products/add", Product)
            .then(res =>{
                console.log(res.data)
            })
            .catch( err => console.log(err));
    }

    const deleteProduct = e => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/products/${itemid}`)
            .then(res => {
                console.log("Item deleted")
            })
            .catch(err =>console.log(err));
    }

    const addOption = e => {
        e.preventDefault();
        const Option = {itemid,type,extra};
        axios.post("http://localhost:8000/api/options/add", Option)
            .then(res =>{
                console.log(res.data)
            })
            .catch( err => console.log(err));
    }
    return(
        <article className="message is-primary" style={{padding:"40px"}}>
            <h1 className="title">Add Item to Margket</h1>
            <div className="message-header">
                <p>Add Product</p>
            </div>
            <div className="message-body">
                <form onSubmit = { addProduct }> 
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Name" onChange={e=> setName(e.target.value)}/>
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Brand" onChange={e=> setBrand(e.target.value)}/>
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Category" onChange={e=> setCategory(e.target.value)}/>
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Image" onChange={e=> setImg(e.target.value)}/>
                    <input type="number" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Price" onChange={e=> setPrice(e.target.value)}/>
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Description" onChange={e=> setDescription(e.target.value)}/>
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter InStock" onChange={e=> setInStock(e.target.value)}/>
                    <button type="submit" style={{width:"100%"}} className="button is-primary">Add Product</button>
                </form>
            </div>

            <div className="message-header">
                <p>Delete Product</p>
            </div>
            <div className="message-body">
                <form onSubmit = { deleteProduct }> 
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Item Id" onChange={e=> setItemId(e.target.value)}/>
                    <button type="submit" style={{width:"100%"}} className="button is-primary">Delete Product</button>
                </form>
            </div>

            <div className="message-header">
                <p>Add Option</p>
            </div>
            <div className="message-body">
                <form onSubmit = { addOption }> 
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Item ID" onChange={e=> setItemId(e.target.value)}/>
                    <input type="text" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Type" onChange={e=> setType(e.target.value)}/>
                    <input type="number" className="input is-primary" style={{marginBottom:"10px"}} placeholder="Enter Extra Cost" onChange={e=> setExtra(e.target.value)}/>
                    <button type="submit" style={{width:"100%"}} className="button is-primary">Add Option</button>
                </form>
            </div>
        </article>
    )
}

export default AdminItem;