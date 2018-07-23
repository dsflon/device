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

        window.userRef.set(signinData).then( () => {
            localStorage.setItem(window.LSUser, JSON.stringify(signinData));
            if(callback) callback()
        });

    },

    In: (data,callback) => {

        let signinData = {},
            key = data.email.replace( '.', '_' );

        window.userRef.child(key).once('value').then( (snapshot) => {

            let data = snapshot.val();

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

        let res = confirm("アカウントを削除しますか？");

        let stuser = localStorage.getItem(window.LSUser);
            stuser = JSON.parse(stuser);

        if(stuser) stuser = Object.keys(stuser)[0];

        if( res == true ) {

            window.userRef.child(stuser).remove().then( () => {
                localStorage.removeItem(window.LSUser);
                localStorage.removeItem(window.LSData);
                if(callback) callback();
            });;

        }

    }

}



function toUpperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export default Sign;
