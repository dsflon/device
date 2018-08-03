import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Borrow from './_rental_borrow';
import Return from './_rental_return';


const Close = (history,e) => {

    if(e) e.preventDefault();
    // history.push("/");
    history.replace("/");

}

const ShowItem = ({props}) => {

    let {
        state,
        history,
        match:{ params: { deviceId } }
    } = props;

    if(!deviceId) return <div />;

    let keys = deviceId.split("_"),
        item = state.list[keys[0]][keys[1]],
        rentalName = item.user ? item.user.uid : null,
        whose = "no";

    let myName = Object.keys(state.user)[0];
    if(rentalName) whose = myName === rentalName ? "own" : "other";

    switch (rentalName) {

        case myName:
        return <Return
            deviceId={deviceId}
            item={item}
            whose={whose}
            history={history}
            close={Close.bind(this)}
            user={state.user} />;

        default:
        return <Borrow
            deviceId={deviceId}
            item={item}
            whose={whose}
            history={history}
            close={Close.bind(this)}
            user={state.user} />

    }


}

const ShowRental = (props) => {

    let {
        history: { location: { key } }
    } = props;

    return (
        <TransitionGroup>
            <CSSTransition
                key={key}
                timeout={300}
                classNames="rental">
                <ShowItem props={props} />
            </CSSTransition>
        </TransitionGroup>
    )

}


export default ShowRental;
