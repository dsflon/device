import React from 'react';

import TimeStamp from '../../common/_timestamp';

class Items extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.uid = Object.keys(this.props.state.user)[0];
    }

    componentDidMount() {
    }

    Rental(e) {

        e.preventDefault();

        let target = e.currentTarget,
            id = target.id,
            user = target.dataset.user,
            rentalDic = {
                'own': () => { console.log(id + " を返す") },
                'other': () => { console.log("借りれません") },
                'no': () => { console.log(id + " を借りる") }
            }

        rentalDic[user]();

    }

    GetList(data,categoryId) {

        let listDom = [];

        for (var deviceId in data) {
            let item = data[deviceId],
                user = item.user,
                dataUser = "no";

            if(user) dataUser = user.uid === this.uid ? "own" : "other"

            let userDom = user ? (
                <div className="list_item_user">
                    <p className="list_item_user_name">
                        {user.dep + " - " + user.name}
                        <span>さん</span>
                    </p>
                    <p className="list_item_user_time">
                        {TimeStamp(user.timestamp) + " ~"}
                    </p>
                </div>
            ) : null;


            listDom.push(
                <li sort={item.sort} key={deviceId} className="list_item">
                    <button
                        id={categoryId+"_"+deviceId}
                        className={"list_item_btn"}
                        data-user={dataUser}
                        data-devicenum={deviceId}
                        data-sim={item.sim}
                        onClick={this.Rental.bind(this)}>

                        <figure className="image" style={  { "backgroundImage": "url("+ item.image +")" } }></figure>
                        <div className="list_item_info">
                            <h2 className="list_item_ttl">
                                {item.name}
                                <span>{item.os}</span>
                            </h2>
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
                    <h1 className={"list_cat"}>{categoryId}</h1>
                    <ul className="list_items">
                        {this.GetList(items,categoryId)}
                    </ul>
                </section>
            );
        }

        return categoryDom;

    }

    render() {

        this.list = this.props.state.list;
        this.user = this.props.state.user;

        let items = this.GetCategory(this.list);

        return (
            <div className="list">
                {items}
            </div>
        );

    }

}

export default Items;
