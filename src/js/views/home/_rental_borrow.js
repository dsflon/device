import React from 'react';
import { Helmet } from "react-helmet";

const Do = (history,user,e) => {

    e.preventDefault();

    let deviceId = e.currentTarget.id,
        deviceName = e.currentTarget.dataset.devicename,
        keyCat = deviceId.split("_")[0],
        keyNum = deviceId.split("_")[1];
        window.Loading.Show();

    let userData = Object.values(user)[0];
        userData["uid"] = Object.keys(user)[0];
        userData["timestamp"] = new Date().getTime();

    let userRef = window.userRef.child(Object.keys(user)[0]+"/device"),
        devideRef = window.devideRef.child(keyCat+"/"+keyNum);

    let userRefObj = {};
        userRefObj[deviceId] = true;

    Promise.resolve()
    .then(() => {
        return new Promise((resolve, reject) => {
            if(!window.Network.Check()) reject("ネットワークをご確認ください!");
            devideRef.child("user").once('value').then( (snapshot) => {
                let data = snapshot.val();
                !data ? resolve() : reject(deviceName + " は貸出中です");
            }).catch(() => {
                reject()
            });
        });
    }).then(() => {
        return new Promise((resolve, reject) => {
            // history.push("/");
            history.replace("/")
            setTimeout(resolve,300);
        });
    }).then(() => {
        return new Promise((resolve, reject) => {
            devideRef.child("user").set(userData).then( () => {
                userRef.update(userRefObj);
                window.BodyMessage.AutoPlay(deviceName + " を借りました");
                window.Loading.Hide();
            }).catch(() => {
                reject();
            });
        });
    }).catch((message) => {
        window.Loading.Hide();
        if(message) window.BodyMessage.AutoPlay(message);
    });

}

class Borrow extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.first = true;
    }

    render() {

        let {
            deviceId,
            item,
            history,
            user,
            close,
            whose
        } = this.props;

        if( whose === "other" && this.first ) {
            window.BodyMessage.AutoPlay("この端末は貸し出されました");
            this.first = false;
        }

        return (
            <section className="rental">

                <Helmet title={item.name+" を借りますか？"}></Helmet>

                <div className="rental_inner borrow">

                    <div
                        className="rental_device m-device"
                        data-sim={item.sim}
                        data-devicenum={deviceId.split("_")[1]}>

                        <figure className="m-device_image"><img src={item.image} /></figure>
                        <div className="m-device_info">
                            <p className="a-ttl m-device_ttl"><span>{item.name}</span></p>
                            <p className="m-device_os">{item.os}</p>
                        </div>

                    </div>

                    <div className="rental_main">

                        <h1 className="a-ttl a-ttl_s">
                            {(whose === "other") ? "この端末は貸し出されました" : "この端末を借りますか？" }
                        </h1>

                        <div className="rental_notice">
                            <ul>
                                <li>・レンタル期間は原則<span className="f-font_b">１日</span>です</li>
                                <li>・<span className="f-font_b">OSアップデートは禁止</span>です</li>
                                <li>・画面ロック解除パス「<span className="f-font_b">123456</span>」</li>
                            </ul>
                        </div>

                        <div className="rental_btns a-btn_col">
                            <button
                                className="a-btn"
                                onClick={close.bind(this,history)}>
                                いいえ
                            </button>
                            <button
                                id={deviceId}
                                disabled={ whose === "other" ? true : false }
                                className="a-btn a-btn_black"
                                data-devicename={item.name}
                                onClick={Do.bind(this,history,user)}>
                                はい
                            </button>
                        </div>

                    </div>

                </div>
            </section>
        )

    }

}

export default Borrow;
