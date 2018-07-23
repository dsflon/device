import firebase from 'firebase/app';

const Sign = {

    Up: (data,callback) => {

        let signinData = {},
            inputData = data;

        let key = inputData.email.replace('.','_'),
            name = inputData.email.split('.');
            name = toUpperFirstLetter(name[0]) + " " + toUpperFirstLetter(name[1])

        signinData[key] = {
            "dep": inputData.dep,
            "name": name
        }

        window.userRef.update(signinData).then( () => {
            localStorage.setItem(window.LSUser, JSON.stringify(signinData));
            if(callback) callback()
        });

    },

    In: (data,callback) => {

        let signinData = {},
            key = data.email.replace( '.', '_' );

        window.userRef.child(key).once('value').then( (snapshot) => {

            let data = snapshot.val();

            delete data.device;

            signinData[key] = data;

            localStorage.setItem(window.LSUser, JSON.stringify(signinData));
            if(callback) callback()

        });

    },

    Out: (data,callback) => {

        let res = confirm("サインアウトしますか？");
        if( res == true ) {

            let signinData = {};
                signinData[data] = null;
            localStorage.setItem(window.LSUser, JSON.stringify(signinData));

            if(callback) callback();
        }

    },

    Remove: (callback) => {

        let stuser = localStorage.getItem(window.LSUser);
            stuser = JSON.parse(stuser);

        stuser = Object.keys(stuser)[0];

        Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                window.userRef.child(stuser).once('value').then( (snapshot) => {
                    let data = snapshot.val();
                    !data.device ? resolve() : reject();
                });
            });
        })
        .then(() => {
            let res = confirm("アカウントを削除しますか？");
            if( res == true && stuser ) {
                window.userRef.child(stuser).remove().then( () => {
                    localStorage.removeItem(window.LSUser);
                    localStorage.removeItem(window.LSData);
                    if(callback) callback();
                });
            }
        }).catch(() => {
            window.BodyMessage.AutoPlay("端末をすべて返却してください");
            window.Loading.Hide();
        });

    }

}

function toUpperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export default Sign;
