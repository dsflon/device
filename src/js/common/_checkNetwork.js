/*
** Check Network
*/
class Network {

    constructor() {
    }

    Check() {
        return navigator.onLine;
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


export default Network;
