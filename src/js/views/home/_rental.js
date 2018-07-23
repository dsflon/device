import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Borrow from './_rental_borrow';
import Return from './_rental_return';

const ShowItem = ({props}) => {

    let {
        state,
        history,
        match:{ params: { deviceId } }
    } = props;

    if(!deviceId) return <div />;

    let keys = deviceId.split("_"),
        item = state.list[keys[0]][keys[1]],
        rentalName = item.user ? item.user.uid : null;

    let myName = Object.keys(state.user)[0];

    if( rentalName && myName !== rentalName ) { //先に借りられたときの処理
        window.BodyMessage.AutoPlay(item.name + " は貸出中です", null, () => {
            location.replace('/');
        });

        return <div />;
    }

    switch (rentalName) {

        case myName:
        return <Return deviceId={deviceId} item={item} history={history} user={state.user} />;

        default:
        return <Borrow deviceId={deviceId} item={item} history={history} user={state.user} />

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
