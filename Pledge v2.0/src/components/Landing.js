import React from "react";
import Header from "./Header";

const LandingPage = () => {

    const myStyle = {
        background:'#fff',
        minHeight: '100vh',
        width: '100%',
        margin: 0
    };
    return (
        <div style={myStyle}>
            <Header />
        </div>
    )
}

export default LandingPage