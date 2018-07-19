import firebase from 'firebase/app';

const Sign = {

    Up: (data) => {

        let signinData = {},
            inputData = data;

        let key = inputData.email.replace( '.', '_' ),
            name = inputData.email.replace( '.', ' ' );

        signinData[key] = {
            "dep": inputData.dep,
            "name": name
        }

        localStorage.setItem("deviceRentalSystem", JSON.stringify(signinData));
        location.replace('/')

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
        // localStorage.setItem("deviceRentalSystem", JSON.stringify(signinData));
        // location.replace('/')

    },

    Out: (data) => {

        let res = confirm("サインアウトしますか？");
        if( res == true ) {

            let signinData = {};
                signinData[data] = null;
            localStorage.setItem("deviceRentalSystem", JSON.stringify(signinData));
            location.replace('/signin')

        }

    },

    Remove: () => {

        let res = confirm("アカウントを削除しますか？");

        if( res == true ) {

            localStorage.removeItem("deviceRentalSystem");
            location.replace('/signout')

        }

    }

}

export default Sign;
