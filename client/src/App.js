import React, { useEffect, useState } from 'react';
import { Router, Link, navigate } from '@reach/router';
import 'bulma/css/bulma.min.css';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Main from './Components/Main';
import Search from "./Components/Search";
import Category from "./Components/Category";
import ItemInfo from './Components/ItemInfo';
import SignIn from './Components/SignIn';
import SignUp from './Components/Signup';
import History from './Components/History';
import Cart from './Components/Cart';
import Shipping from './Components/Shipping';
import AdminItem from './Components/AdminItem';
import AdminHistory from './Components/AdminHistory';
import logo from './Components/Icon/Emarket.png';
const App = props => {
  const [user, setUser] = useState();

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [number, setNumber] = useState(0);
  const [category, setCategory] = useState("");

  ////////////loggedinuser/////////////
  var userinfo = Cookies.get('userInfo')
  const LoggedinUserInfo = e =>{
      const UserisAdmin = e.slice((e.indexOf('isAdmin":')+9),e.indexOf(',"_id"'))
      const UserID = e.slice((e.indexOf('"_id":"')+7),e.indexOf('","firstName"'))
      const UserFN = e.slice((e.indexOf('firstName":"')+12),e.indexOf('","lastName":'))
      const UserLN = e.slice((e.indexOf('lastName":"')+11),e.indexOf('","email"'))
      const UserEmail = e.slice((e.indexOf('email":"')+8),e.indexOf('","address'))
      const LoggedinUser = {
          isAdmin: UserisAdmin,
          _id: UserID,
          firstName: UserFN,
          lastName: UserLN,
          email: UserEmail
      }
      userinfo = LoggedinUser
      return userinfo
  }
  if(Cookies.get('userInfo')){
  LoggedinUserInfo(Cookies.get('userInfo'))}
  ///////////////////////////////////////////

  const logout = () =>{
    Cookies.remove('userInfo');
    window.location.reload(false);
  }

  const enter = () => {
    navigate(`/search/${search}`, { state: {value: search  }});
  }

  const closebar = () => {
    setOpen(false);
    setNumber(0);
  }

  const fetchCart = () => {
      axios.get(`http://localhost:8000/api/carts/${userinfo._id}`)
          .then(res => setItems(res.data))
          .catch(err =>console.log(err));
  }
  useEffect(()=>{
    if(Cookies.get('userInfo')){
      fetchCart();
    }
  },[])

  

  // const openMenu = () => {
  //   document.querySelector('.categorybar').classList.add('open');
  // };
  // const closeMenu = () => {
  //   document.querySelector('.categorybar').classList.remove('open');
  // };

  return (
    <div className="App">
      <section className="hero" style={{backgroundColor:"#f2efe8"}}>
        <div className="hero-body">
          <div>
            {/* ////////////// header ////////////// */}
            <div className="head_left">
              {open === false ? (
                <div className="tooltip">
                  <img onClick={() => setOpen(true)} src="https://cdn2.iconfinder.com/data/icons/shopping-273/512/menu-512.png" style={{display:"inline", width:"50px"}}/>
                  <span className="tooltiptext">Category</span>
                </div>
              ) : (
                <div className="tooltip">
                  <img onClick={ closebar } src="https://cdn2.iconfinder.com/data/icons/flat-icons-web/40/Remove-512.png" style={{display:"inline", width:"50px"}}/>
                  <span className="tooltiptext">Category</span>
                </div>
              )}
              <Link to="/"><img src={logo} style={{width:"131px",height:"53px"}}/></Link>
            </div>
            <div className="head_center" style={{marginTop:"10px"}}>
              <form onSubmit={ enter }>
                <div className="control is-rounded has-icons-right">
                  <input onChange={e=>setSearch(e.target.value)} className="input is-rounded" type="text" placeholder="Search"/>
                </div>
                <button className="searchIconbt"><img className="searchIcon" type="submit" src="https://cdn2.iconfinder.com/data/icons/shopping-273/512/search-512.png"/></button>
              </form>
            </div>
            <div className="head_right">
              {  Cookies.get('userInfo') ?
              <div className="tooltip">
                <Link to="/history"><img src="https://cdn2.iconfinder.com/data/icons/shopping-273/512/mypage-512.png" style={{width:"50px"}}/></Link>
                <span className="tooltiptext">History</span>
              </div> :
              <div className="tooltip">
                <Link to="/signIn"><img src="https://cdn2.iconfinder.com/data/icons/shopping-273/512/mypage-512.png" style={{width:"50px"}}/></Link>
                <span className="tooltiptext">SignIn</span>
              </div>
              }
              {  Cookies.get('userInfo') ?
              <div className="tooltip">
                <div className="Cart">
                  <h1 className="circled">{items.length}</h1>
                  <Link to="/user/cart"><img src="https://cdn2.iconfinder.com/data/icons/shopping-273/512/cart-512.png" style={{width:"50px"}}/></Link>
                  <span className="tooltiptext">Cart</span>
                </div>
              </div>:
              <div className="tooltip">
                <div>
                  <h1 className="circled">{items.length}</h1>
                  <Link to="/signIn"><img src="https://cdn2.iconfinder.com/data/icons/shopping-273/512/cart-512.png" style={{width:"50px"}}/></Link>
                  <span className="tooltiptext">Cart</span>
                </div>
              </div>
              }
            </div>
            {  Cookies.get('userInfo') ?
              <div className="user">
                <p style={{fontWeight:"bold",display:"inline-block", marginRight:"10px"}}>Hello {userinfo.firstName}</p>
                <a style={{display:"inline-block"}} onClick={logout}>Log Out</a>
              </div>: false
            }
          </div>
          { open === true ?
            <div className="categorybar">
              <div className="cateLeft">
                { number === 1?
                  <div className="categoriesText" style={{backgroundColor:"#f2efe8", color:"black"}}>
                    <h1 onClick={() => setNumber(1)}>Fashion <span style={{color:"red"}}>&</span> Beauty</h1>
                  </div>
                :
                  <div className="categoriesText">
                    <h1 onClick={() => setNumber(1)}>Fashion <span style={{color:"red"}}>&</span> Beauty</h1>
                  </div>
                }
                { number === 2?
                  <div className="categoriesText" style={{backgroundColor:"#f2efe8", color:"black"}}>
                    <h1 onClick={() => setNumber(2)}>Kids</h1>
                  </div>
                :
                  <div className="categoriesText">
                    <h1 onClick={() => setNumber(2)}>Kids</h1>
                  </div>
                }
                { number === 3?
                  <div className="categoriesText" style={{backgroundColor:"#f2efe8", color:"black"}}>
                    <h1 onClick={() => setNumber(3)}>Foods</h1>
                  </div>
                :
                  <div className="categoriesText">
                    <h1 onClick={() => setNumber(3)}>Foods</h1>
                  </div>
                }
                { number === 4?
                  <div className="categoriesText" style={{backgroundColor:"#f2efe8", color:"black"}}>
                    <h1 onClick={() => setNumber(4)}>Sports <span style={{color:"red"}}>&</span> Health</h1>
                  </div>
                :
                  <div className="categoriesText">
                    <h1 onClick={() => setNumber(4)}>Sports <span style={{color:"red"}}>&</span> Health</h1>
                  </div>
                }
                { number === 5?
                  <div className="categoriesText" style={{backgroundColor:"#f2efe8", color:"black"}}>
                    <h1 onClick={() => setNumber(5)}>Electronics <span style={{color:"red"}}>&</span> Appliances</h1>
                  </div>
                :
                  <div className="categoriesText">
                    <h1 onClick={() => setNumber(5)}>Electronics <span style={{color:"red"}}>&</span> Appliances</h1>
                  </div>
                }
                { number === 6?
                  <div className="categoriesText" style={{backgroundColor:"#f2efe8", color:"black"}}>
                    <h1 onClick={() => setNumber(6)}>Travels <span style={{color:"red"}}>&</span> Books</h1>
                  </div>
                :
                  <div className="categoriesText">
                    <h1 onClick={() => setNumber(6)}>Travels <span style={{color:"red"}}>&</span> Books</h1>
                  </div>
                }
              </div>
              <div className="cateRight">
                {number == 1?
                  <div className="fashion">
                    <Link to="/category/brands"><h1>Brands</h1></Link>
                    <Link to="/category/men"><h1>Men's</h1></Link>
                    <Link to="/category/women"><h1>Women's</h1></Link>
                    <Link to="/category/shoes"><h1>Shoes</h1></Link>
                    <Link to="/category/makeup"><h1>Makeup/Perfume</h1></Link>
                    <Link to="/category/bodyhair"><h1>Body/Hair</h1></Link>
                  </div>:false
                }
                {number == 2?
                  <div className="kids">
                    <Link to="/category/clothes"><h1>Clothes</h1></Link>
                    <Link to="/category/shoes"><h1>Shoes</h1></Link>
                    <Link to="/category/toys"><h1>Toys</h1></Link>
                    <Link to="/category/bodyhair"><h1>Body/Hair</h1></Link>
                </div>:false
                }
                {number == 3?
                  <div className="foods">
                    <Link to="/category/fresh"><h1>Fresh Foods</h1></Link>
                    <Link to="/category/health"><h1>Health Foods</h1></Link>
                    <Link to="/category/drink"><h1>Coffee/Drinks</h1></Link>
                  </div>:false
                }
                {number == 4?
                  <div className="sports">
                    <Link to="/category/shoes"><h1>Shoes</h1></Link>
                    <Link to="/category/fitnessswim"><h1>Fitness/Swim</h1></Link>
                    <Link to="/category/ball"><h1>Ball Game</h1></Link>
                    <Link to="/category/bike"><h1>Bike/Leisure</h1></Link>
                    <Link to="/category/camping"><h1>Camping/Fishing</h1></Link>
                    <Link to="/category/hiking"><h1>Hiking/Outdoor</h1></Link>
                  </div>:false
                }
                {number == 5?
                  <div className="electronics">
                    <Link to="/category/computer"><h1>PC Appliances</h1></Link>
                    <Link to="/category/tabletphone"><h1>Tablet/Phone</h1></Link>
                    <Link to="/category/appliance"><h1>Home Appliances</h1></Link>
                    <Link to="/category/seasonal"><h1>Seasonal Appliances</h1></Link>
                  </div>:false
                }
                {number == 6?
                  <div className="travels">
                    <Link to="/category/travels"><h1>Travels</h1></Link>
                    <Link to="/category/books"><h1>Books</h1></Link>
                    <Link to="/category/albums"><h1>Albums</h1></Link>
                    <Link to="/category/ebooks"><h1>EBooks</h1></Link>
                  </div>:false
                }
              </div>
            </div>
            : false
          }
        </div>
      </section>

      <Router>
        <Main path ="/" />
        <SignIn path="/signIn" />
        <SignUp path="/signUp" />
        <History path="/history" />
        <ItemInfo path="/itemid/:_id" />
        <Category path="/category/:category" param={{value: category}} />
        <Search path="/search/:search"/>
        <Cart path="/user/cart" />
        <Shipping path="/user/shipping" />
        <AdminItem path="/admin" />
        <AdminHistory path="/admin/history" />
      </Router>
    </div>
  );
}

export default App;
