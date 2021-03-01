import React, { useState } from 'react';
import '../css/homepage.css';
const Homepage = () => {
   const [data, setdata] = useState([]);
   const [loading, setloading] = useState(false);
   const handleClick = async () => {
      setloading(true);
      fetch('https://reqres.in/api/users?page=1')
         .then((res) => res.json())
         .then(
            (result) => {
               setdata(result.data);
               console.log(result.data);
               setloading(false);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
               setloading(false);
            }
         );
   };
   return loading ? (
      <div className="colors" style={{ paddingTop: '200px' }}>
         <div className="JokeList-spinner">
            <i className="far fa-8x fa-laugh fa-spin"></i>
            <h1 className="JokeList-title">Loading...</h1>
         </div>
      </div>
   ) : (
      <div>
         <nav>
            <label class="logo">StyleX</label>
            <ul>
               <li>
                  <button onClick={handleClick}>Get Users</button>
               </li>
            </ul>
         </nav>
         {data.length === 0 ? (
            <h2 className="infotext">Click on the button to get users.</h2>
         ) : (
            <div className="container">
               {data.map((item) => (
                  <div className="card">
                     <div className="name">
                        {item.first_name} {item.last_name}
                     </div>
                     <img className="image" src={item.avatar}></img>
                     <div className="email">{item.email}</div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Homepage;
