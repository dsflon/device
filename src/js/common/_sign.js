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

        console.log(signinData);

        localStorage.setItem(window.LSUser, JSON.stringify(signinData));

        if(callback) setTimeout( callback, 1000)

    },

    In: (data,callback) => {

        let signinData = {},
            inputData = data;

        let key = inputData.email.replace( '.', '_' ),
            name = inputData.email.replace( '.', ' ' );

        console.log("SignIn: ",key);

        // let signinData = {},
        //     inputData = data;
        //
        // let key = inputData.email.replace( '.', '_' ),
        //     name = inputData.email.replace( '.', ' ' );
        //
        // signinData[key] = {
        //     "dep": inputData.dep,
        //     "name": name
        // }
        //
        // localStorage.setItem(window.LSUser, JSON.stringify(signinData));
        // location.replace('/')

        if(callback) setTimeout( callback, 1000)

    },

    Out: (data,callback) => {

        let res = confirm("サインアウトしますか？");
        if( res == true ) {

            let signinData = {};
                signinData[data] = null;
            localStorage.setItem(window.LSUser, JSON.stringify(signinData));

            if(callback) setTimeout(callback, 1000)
        }

    },

    Remove: (callback) => {

        let res = confirm("アカウントを削除しますか？");

        if( res == true ) {

            localStorage.removeItem(window.LSUser);
            localStorage.removeItem(window.LSData);
            if(callback) setTimeout( callback, 1000)

        }

    }

}



function toUpperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export default Sign;
