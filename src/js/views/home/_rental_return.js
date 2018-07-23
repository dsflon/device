import React from 'react';

const Do = (history,user,e) => {

    e.preventDefault();

    let deviceId = e.currentTarget.id,
        deviceName = e.currentTarget.dataset.devicename,
        keyCat = deviceId.split("_")[0],
        keyNum = deviceId.split("_")[1];
        window.Loading.Show();

    let userRef = window.userRef.child(Object.keys(user)[0]+"/device/" + deviceId),
        devideRef = window.devideRef.child(keyCat+"/"+keyNum+"/user");

    Promise.resolve()
    .then(() => {
        return new Promise((resolve, reject) => {
            devideRef.once('value').then( (snapshot) => {
                let data = snapshot.val();
                data ? resolve() : reject();
            });
        });
    }).then(() => {
        return new Promise((resolve, reject) => {
            history.push("/");
            setTimeout( resolve, 300);
        });
    }).then(() => {
        devideRef.remove().then( () => {
            window.BodyMessage.AutoPlay(deviceName + " を返却しました");
            userRef.remove();
            window.Loading.Hide();
        });
    }).catch((e) => {
        // history.push("/");
        // userRef.remove();
        // window.Loading.Hide();
        // window.BodyMessage.AutoPlay("既に返却済みです");
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
