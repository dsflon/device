import React from 'react';

import { Link } from "react-router-dom";
import Sign from '../../common/_sign';
import icon from '../../../images/icon_user.svg';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {}
    componentDidUpdate() {}


    Remove(e) {

        e.preventDefault();
        Sign.Remove();
        location.replace('/signout')

    }

    SignOut(e) {

        e.preventDefault();
        Sign.Out( Object.keys(this.props.user)[0] );
        location.replace('/signin')

    }

    render() {

        this.user = Object.values(this.props.user)[0];

        return (
            <header id="header">
                <div id="header_inner" className="f-inner">
                    <h1 className="header_ttl a-ttl">DEVICE RS</h1>
                    <div className="header_wrap">
                        <p className="header_user">
                            {this.user.dep + " - " + this.user.name}
                            <span> さん</span>
                        </p>
                        <button className="header_btn"><img src={icon} /></button>
                    </div>
                    <nav className="header_nav">
                        <ul>
                            <li><Link to="/edit_profile">Edit Profile</Link></li>
                            <li><button onClick={this.SignOut.bind(this)}>Sign Out</button></li>
                            <li><button onClick={this.Remove.bind(this)}>Remove Account</button></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );

    }

}

export default Header;
