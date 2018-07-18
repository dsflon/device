import React from 'react';
import Borrow from './_rental_borrow';
import Return from './_rental_return';

const ShowRental = (props) => {

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

export default ShowRental;
