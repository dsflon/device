/*
** Check Network
*/
class CheckNetwork {

    constructor() {
    }

    Check() {
        if( !navigator.onLine ) {
            return false;
        } else {
            return true;
        }
    }

    AddClassHTML() {

        let tagHtml = document.getElementsByTagName('html')[0];

        if( !this.Check() ) {
            tagHtml.classList.add("offline");
        } else {
            tagHtml.classList.remove("offline");
        }

    }

}


export default CheckNetwork;
