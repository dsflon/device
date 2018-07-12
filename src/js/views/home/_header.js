import React from 'react';

// import Log from '../../common/_login_out';
import icon from '../../../images/icon_user.svg';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {}
    componentDidUpdate() {}

    render() {

        this.user = Object.values(this.props.user)[0];

        return (
            <header id="header">
                <h1 className="header_ttl a-ttl">DEVICE RS</h1>
                <div className="header_wrap">
                    <p className="header_user">
                        {this.user.dep + " - " + this.user.name}
                        <span> さん</span>
                    </p>
                    <button className="header_btn"><img src={icon} /></button>
                </div>
            </header>
        );

    }

}

export default Header;
