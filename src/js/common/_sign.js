import firebase from 'firebase/app';

const Sign = {

    In: (data) => {

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

    Out: () => {

        let res = confirm("サインアウトしますか？");
        if( res == true ) {

            localStorage.removeItem("deviceRentalSystem");

        }

    },

    Remove: () => {

        let res = confirm("アカウントを削除しますか？");

        if( res == true ) {
        }

    }

}

export default Sign;
