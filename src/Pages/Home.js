import React from 'react';
import Poster from "../images/Poster final.jpg";
function Home() {
    return (
        <div>
            <h1>Welcome User</h1>
            <h3>Here is what trackit can do for you</h3>
            <img src={Poster} alt="Poster" />
        </div>
    );
}

export default Home;