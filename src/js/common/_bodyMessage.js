class BodyMessage {

    constructor(target) {

        this.target = target;

    }

    AutoPlay(message) {

        if(!message) return false;
        this.Set(message)
        setTimeout( this.Remove.bind(this), 2000)

    }

    Set(message) {

        if(!message) return false;
        this.target.dataset.message = message;

        setTimeout( () => {
            this.target.classList.add("show_message")
        }, 1)

    }

    Remove() {

        const TransitionEnd = (e) => {
            let target = e.currentTarget;
            target.dataset.message = "";
            target.removeEventListener("transitionend", TransitionEnd)
        }

        this.target.classList.remove("show_message");
        this.target.addEventListener("transitionend", TransitionEnd)

    }

}


export default BodyMessage;