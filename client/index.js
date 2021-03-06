// import React from 'react';
// import { render } from 'react-dom';
// import App from './components/App';
// import Main from './components/Main';
//
// render(<Main />, document.getElementById('app'));

// import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes.js';


const rootElement = document.getElementById('app');

ReactDOM.render(

        <Routes />
    ,
    rootElement
);


// ReactDOM.render(
//     <AppContainer>
//         <Routes />
//     </AppContainer>,
//     rootElement
// );


if (module.hot) {
    module.hot.accept('./config/Routes.js', () => {
        const NextRoutes = require('./config/Routes.js').default;
        ReactDOM.render(
            <AppContainer>
                <NextRoutes />
            </AppContainer>,
            rootElement
        );
    });
}
