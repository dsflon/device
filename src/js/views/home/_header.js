import React from 'react';

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

    }

    SignOut(e) {

        e.preventDefault();
        Sign.Out( Object.keys(this.props.user)[0] );

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
                <div><button onClick={this.Remove.bind(this)}>アカウント削除</button></div>
                <div><button onClick={this.SignOut.bind(this)}>sign out</button></div>
            </header>
        );

    }

}

export default Header;
