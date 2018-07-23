import React from 'react';

import TimeStamp from '../../common/_timestamp';

class Items extends React.Component {

    constructor(props) {
        super(props);

        let date1 = new Date("2018/01/01"),
            date2 = new Date("2018/01/02"),
            msDiff = date2.getTime() - date1.getTime();

        this.limit = msDiff * 1;
        this.today = new Date().getTime();

    }

    GetList(data,categoryId) {

        let listDom = [], noticeList = null;

        for (var deviceId in data) {

            let item = data[deviceId],
                user = item.user,
                dataUser = "no";

            if(user) dataUser = user.uid === this.uid ? "own" : "other";

            let notice = user && this.today - user.timestamp > this.limit,
                noticeDom = null;

            if(notice) {
                noticeDom = <i className={"notice a-icon a-icon_notice" + (user.uid === this.uid ? " a-icon_notice_w" : "")}></i>;
                noticeList = notice;
            }

            let userDom = user ? (
                <div className="m-device_user">
                    {
                        (() => {
                            if(user.uid !== this.uid) {
                                return (
                                    <p className="m-device_user_name">
                                        {user.dep + ": " + user.name}
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

            if( deviceId !== "sort" ) {
                listDom.push(
                    <li sort={item.sort} key={deviceId} className="list_item">
                        <button
                            id={categoryId+"_"+deviceId}
                            className="list_item_btn m-device"
                            data-user={dataUser}
                            data-devicenum={deviceId}
                            data-devicename={item.name}
                            data-sim={item.sim}
                            onClick={ this.props.rental.bind(this) }>

                            <figure className="m-device_image"><img src={item.image} /></figure>
                            <div className="m-device_info">
                                <h3 className="a-ttl m-device_ttl"><span>{item.name}</span></h3>
                                <p className="m-device_os">{item.os}</p>
                                {userDom}
                            </div>

                            {noticeDom}

                        </button>
                    </li>
                );
            }
        }

        //sortNum順に並べる
        listDom.sort(
            function(a,b){
                return (a.props.sort > b.props.sort ? 1 : -1);
            }
        );

        return {
            noticeList: noticeList,
            listDom: listDom
        };

    }

    GetCategory(data) {

        let categoryDom = [], noticeList;

        for (var categoryId in data) {
            let items = data[categoryId],
                sort = items.sort;

            let getList = this.GetList(items,categoryId);
            noticeList = getList.noticeList;

            categoryDom.push(
                <section sort={sort} key={categoryId} className="list">
                    <h2 className="a-ttl a-ttl_m a-ttl_mb list_cat">{categoryId}</h2>
                    <ul className="list_items">
                        {getList.listDom}
                    </ul>
                </section>
            );
        }

        //sortNum順に並べる
        categoryDom.sort(
            function(a,b){
                return (a.props.sort > b.props.sort ? 1 : -1);
            }
        );

        return {
            noticeList: noticeList,
            categoryDom: categoryDom
        };

    }

    render() {

        this.user = this.props.state.user;
        this.list = this.props.state.list;
        this.uid = Object.keys(this.user)[0];

        let getCategory = this.GetCategory(this.list),
            items = getCategory.categoryDom,
            noticeList = getCategory.noticeList;

        let listsNotice = noticeList ? (
            <p className="lists_notice">
                <i className="a-icon a-icon_notice"></i>
                <span className="a-icon_txt">返却されていない端末があります</span>
            </p>
        ) : null;

        return (
            <div className="lists" ref="lists">
                {listsNotice}
                {items}
            </div>
        );

    }

}

export default Items;
