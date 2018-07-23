const Fetch = () => {

    // Fetchはローカル用
    // fetch('/initial_messages.json')
    // .then( (response) => {
    //     return response.json();
    // })
    // .then( (json) => {
    //     window.actions.List(json.device);
    //     console.log(json.device);
    // });

    let deviceData = {}, timer;

    let SetData = (data) => {

        let key = data.key,
            val = data.val(),
            sort = val.sort;

            deviceData[key] = val;

        window.actions.List(deviceData);

    };

    window.messagesRef.off();
    window.messagesRef.on('child_added', SetData);
    window.messagesRef.on('child_changed', SetData);
    window.messagesRef.on('child_removed', (data) => {
    });

}
//
// const Fetch = (actions,myAccount) => {
//
//     if(!myAccount) return false;
//
//     GetMetaData(actions,myAccount);
//
// }
//
// function GetMetaData(actions,myAccount) {
//
//     let meta = {}, timer;
//
//     let SetMeta = (data) => {
//         let val = data.val();
//         if (val.members && val.members.hasOwnProperty(myAccount.uid)) {
//             meta[data.key] = data.val();
//         }
//         clearTimeout(timer);
//         timer = setTimeout( () => {
//             actions.Meta(meta);
//             localStorage.setItem("ChatStorageMeta", JSON.stringify(meta));
//         },1)
//     };
//
//     window.metaRef.off();
//     window.metaRef.on('child_added', SetMeta);
//     window.metaRef.on('child_changed', SetMeta);
//     window.metaRef.on('child_removed', (data) => {
//         delete meta[data.key];
//         actions.Meta(meta);
//     });
//     window.metaRef.once('value').then( (snapshot) => {
//         // DBにMetaがなくても実行できるように
//         let data = snapshot.val();
//         if( !data ) actions.Meta({});
//     });
//
//
// }

export default Fetch;
