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

    // Fetch Localstorage
    let storage = localStorage.getItem(window.LSData);
        storage = JSON.parse(storage);

    if( storage ) window.actions.List(storage);

    let SetData = (data) => {

        let key = data.key,
            val = data.val(),
            sort = val.sort;

            deviceData[key] = val;

        clearTimeout(timer);
        timer = setTimeout( () => {
            window.actions.List(deviceData);
            localStorage.setItem(window.LSData, JSON.stringify(deviceData));
        },1)

    };

    window.devideRef.off();
    window.devideRef.on('child_added', SetData);
    window.devideRef.on('child_changed', SetData);
    window.devideRef.on('child_removed', (data) => {
    });

}

export default Fetch;
