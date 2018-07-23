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

    let keys = deviceId.split("_");
    let item = state.list[keys[0]][keys[1]];
    let rental = item.user ? item.user.uid : "borrow";

    switch (rental) {

        case 'borrow':
        return <Borrow deviceId={deviceId} item={item} history={history} user={state.user} />

        case Object.keys(state.user)[0]:
        return <Return deviceId={deviceId} item={item} history={history} />;

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
