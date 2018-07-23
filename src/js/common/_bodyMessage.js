class BodyMessage {

    constructor(target) {

        this.target = target;

    }

    AutoPlay(message,callback,callback2) {

        if(!message) return false;
        this.Set(message)
        setTimeout( () => {
            this.Remove(callback);
            if(callback2) callback2();
        }, 2000)

    }

    Set(message) {

        if(!message) return false;
        this.target.dataset.message = message;

        setTimeout( () => {
            this.target.classList.add("show_message")
        }, 1)

    }

    Remove(callback) {

        const TransitionEnd = (e) => {
            let target = e.currentTarget;
            target.dataset.message = "";
            if(callback) callback();
            target.removeEventListener("transitionend", TransitionEnd)
        }

        this.target.classList.remove("show_message");
        this.target.addEventListener("transitionend", TransitionEnd)

    }

}


export default BodyMessage;
