import firebase from 'firebase/app';

const Sign = {

    Up: (data) => {

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

        localStorage.setItem(window.LSName, JSON.stringify(signinData));

    },

    In: (data) => {

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
        // localStorage.setItem(window.LSName, JSON.stringify(signinData));
        // location.replace('/')

    },

    Out: (data,callback) => {

        let res = confirm("サインアウトしますか？");
        if( res == true ) {

            let signinData = {};
                signinData[data] = null;
            localStorage.setItem(window.LSName, JSON.stringify(signinData));

            if(callback) callback()
        }

    },

    Remove: (callback) => {

        let res = confirm("アカウントを削除しますか？");

        if( res == true ) {

            localStorage.removeItem(window.LSName);
            if(callback) callback()

        }

    }

}



function toUpperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export default Sign;
