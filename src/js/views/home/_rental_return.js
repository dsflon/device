import React from 'react';
import { Helmet } from "react-helmet";

const Do = (history,user,e) => {

    e.preventDefault();

    let deviceId = e.currentTarget.id,
        deviceName = e.currentTarget.dataset.devicename,
        keyCat = deviceId.split("_")[0],
        keyNum = deviceId.split("_")[1];
        window.Loading.Show();

    let timestamp = new Date(),
        year = timestamp.getFullYear(),
        month = timestamp.getMonth()+1,
        day = timestamp.getDate();

        timestamp = timestamp.getTime() + "__" + year + "_" + month + "_" + day;

    let userData = Object.keys(user)[0];
        userData = user[userData];

    let log = {};
        log[timestamp] = {};
        log[timestamp]["name"] = userData.name;
        log[timestamp]["dep"] = userData.dep;

    let userRef = window.userRef.child(Object.keys(user)[0]+"/device/" + deviceId),
        devideRef = window.devideRef.child(keyCat+"/"+keyNum);

    Promise.resolve()
    .then(() => {
        return new Promise((resolve, reject) => {
            if(!window.Network.Check()) reject("ネットワークをご確認ください!");
            devideRef.child("user").once('value').then( (snapshot) => {
                let data = snapshot.val();
                data ? resolve() : reject("既に返却済みです");
            }).catch(() => {
                reject()
            });
        });
    }).then(() => {
        return new Promise((resolve, reject) => {
            // history.push("/");
            history.replace("/")
            setTimeout( resolve, 300);
        });
    }).then(() => {
        devideRef.child("user").remove().then( () => {
            window.BodyMessage.AutoPlay(deviceName + " を返却しました");
            userRef.remove();
            window.Loading.Hide();
        });
        devideRef.child("log").update(log);
    }).catch((message) => {
        window.Loading.Hide();
        if(message) window.BodyMessage.AutoPlay(message);
    });

}

const Return = (props) => {

    let {
        deviceId,
        item,
        history,
        user,
        close,
        whose
    } = props;

    let deviceNum = deviceId.split("_")[1];

    return (
        <section className="rental">

            <Helmet title={item.name+" を返却しますか？"}></Helmet>

            <div className="rental_inner return">

                <div className="rental_device m-device" data-sim={item.sim} data-devicenum={deviceNum}>
                    <figure className="m-device_image"><img src={item.image} /></figure>
                    <div className="m-device_info">
                        <h2 className="a-ttl m-device_ttl"><span>{item.name}</span></h2>
                        <p className="m-device_os">{item.os}</p>
                    </div>
                </div>

                <div className="rental_main">

                    <p className="a-ttl a-ttl_s f-txt_red">この端末を返却しますか？</p>

                    <div className="rental_notice">
                        <ul className="f-font_b">
                            <li>・電池残量は十分ですか？</li>
                            <li>・画面は拭き取りましたか？</li>
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
                            className="a-btn a-btn_red"
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

export default Return;
