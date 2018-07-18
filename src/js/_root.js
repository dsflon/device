import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './views/home'
import SignUp from './views/signup'
import SignIn from './views/signin'

const GetPages = (props) => {

    const {
        match: { url, params: { page } }
    } = props;

    switch (page) {

        case 'signup':
        return <SignUp props={props} />

        case 'signin':
        return <SignIn props={props} />

        default:
        return <Route
                path={`${url}/:deviceId?`}
                render={ ({match,history}) => (
                    <Home match={match} history={history} />
                )} />

    }

}

const Root = () => (

    <Router>
        <Route path="/:page?" component={GetPages} />
    </Router>

)

// const Root = () => (
//     <Router>
//         <div id="container">
//             <Route exact path="/" component={Home} />
//             {/*<Route exact path="/:rental?" component={Home} />*/}
//             <Route path="/signup" component={SignUp} />
//             <Route path="/signin" component={SignIn} />
//         </div>
//     </Router>
// )

export default Root;
