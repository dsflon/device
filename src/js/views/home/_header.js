import React from 'react';

import { Link } from "react-router-dom";
import logo from '../../../images/logo.svg';
import icon from '../../../images/icon_user.svg';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <header id="header">
                    <div id="header_inner" className="f-inner">
                        <h1 className="header_ttl a-ttl"><img src={logo} alt="DEVICE RS" /></h1>
                        <div className="header_wrap">
                            <button className="header_btn" onClick={this.props.OpenMenu.bind(this)}>
                                <img src={icon} />
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        );

    }

}

export default Header;
