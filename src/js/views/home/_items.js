import React from 'react';

import TimeStamp from '../../common/_timestamp';

class Items extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.user = this.props.state.user;
        this.list = this.props.state.list;
        this.uid = Object.keys(this.user)[0];
    }

    componentDidMount() {
    }

    GetList(data,categoryId) {

        let listDom = [];

        for (var deviceId in data) {
            let item = data[deviceId],
                user = item.user,
                dataUser = "no";

            if(user) dataUser = user.uid === this.uid ? "own" : "other"

            let userDom = user ? (
                <div className="m-device_user">
                    {
                        (() => {
                            if(user.uid !== this.uid) {
                                return (
                                    <p className="m-device_user_name">
                                        {user.dep + " - " + user.name}
                                        <span> さん</span>
                                    </p>
                                )
                            } else {
                                return <p className="m-device_user_name">あなたが使用しています</p>
                            }
                        })()
                    }
                    <p className="m-device_user_time">
                        {TimeStamp(user.timestamp) + " ~"}
                    </p>
                </div>
            ) : null;

            listDom.push(
                <li sort={item.sort} key={deviceId} className="list_item">
                    <button
                        id={categoryId+"_"+deviceId}
                        className="list_item_btn m-device"
                        data-user={dataUser}
                        data-devicenum={deviceId}
                        data-sim={item.sim}
                        onClick={this.props.rental.bind(this)}>

                        <figure className="m-device_image"><img src={item.image} /></figure>
                        <div className="m-device_info">
                            <h2 className="a-ttl m-device_ttl"><span>{item.name}</span></h2>
                            <p className="m-device_os">{item.os}</p>
                            {userDom}
                        </div>

                    </button>
                </li>
            );
        }

        //sortNum順に並べる
        listDom.sort(
            function(a,b){
                return (a.props.sort > b.props.sort ? 1 : -1);
            }
        );

        return listDom;
    }

    GetCategory(data) {

        let categoryDom = [];

        for (var categoryId in data) {
            let items = data[categoryId];

            categoryDom.push(
                <section key={categoryId} className={"list"}>
                    <h1 className={"a-ttl a-ttl_m a-ttl_mb list_cat"}>{categoryId}</h1>
                    <ul className="list_items">
                        {this.GetList(items,categoryId)}
                    </ul>
                </section>
            );
        }

        return categoryDom;

    }

    render() {

        let items = this.GetCategory(this.list);

        return (
            <div className="lists">
                {items}
            </div>
        );

    }

}

export default Items;
