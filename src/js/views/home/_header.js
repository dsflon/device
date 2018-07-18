import React from 'react';

import Sign from '../../common/_sign';
import icon from '../../../images/icon_user.svg';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {}
    componentDidUpdate() {}


    SignOut(e) {

        e.preventDefault();
        
        Sign.Out();
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
                </div>
                <button onClick={this.SignOut.bind(this)}>sign out</button>
            </header>
        );

    }

}

export default Header;
