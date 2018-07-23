import React from 'react';

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
        devideRef = window.devideRef.child(keyCat+"/"+keyNum+"/user");

    let userRefObj = {};
        userRefObj[deviceId] = true;

    Promise.resolve()
    .then(() => {
        return new Promise((resolve, reject) => {
            devideRef.once('value').then( (snapshot) => {
                let data = snapshot.val();
                !data ? resolve() : reject();
            });
        });
    }).then(() => {
        return new Promise((resolve, reject) => {
            history.push("/");
            setTimeout( resolve, 300);
        });
    }).then(() => {
        devideRef.set(userData).then( () => {
            userRef.update(userRefObj);
            window.BodyMessage.AutoPlay(deviceName + " を借りました");
            window.Loading.Hide();
        });
    }).catch((e) => {
        history.push("/");
        window.Loading.Hide();
        window.BodyMessage.AutoPlay(deviceName + " は貸出中です");
    });

}

const Borrow = (props) => {

    let {
        deviceId,
        item,
        history,
        user,
        close,
        whose
    } = props;

    if( whose === "other" ) {
        window.BodyMessage.AutoPlay("この端末は貸し出されました");
    }

    let deviceNum = deviceId.split("_")[1];

    return (
        <section className="rental">
            <div className="rental_inner borrow">

                <div className="rental_device m-device" data-sim={item.sim} data-devicenum={deviceNum}>
                    <figure className="m-device_image"><img src={item.image} /></figure>
                    <div className="m-device_info">
                        <p className="a-ttl m-device_ttl"><span>{item.name}</span></p>
                        <p className="m-device_os">{item.os}</p>
                    </div>
                </div>

                <div className="rental_main">

                    <h1 className="a-ttl a-ttl_s">この端末を借りますか？</h1>

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

export default Borrow;
