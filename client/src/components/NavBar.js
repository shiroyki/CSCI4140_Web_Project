import React from "react";
import {Link} from "react-router-dom";

const NavBar = ( ) => {
    return (
        <>
        <div className="nav">
            <div className="nav-links">
                <div className="nav-item">
                    <Link className="nav-link" to="/">
                        Home

                    </Link>

                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/about">
                        About

                    </Link>

                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/upload">
                        Upload

                    </Link>

                </div>
                <div className="nav-item">
                    <Link className="nav-link" to="/config">
                        Config

                    </Link>

                </div>
            </div>

        </div>
          
        </>

    );
}

export default NavBar;