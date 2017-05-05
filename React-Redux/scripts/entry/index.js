// css
import '../../css/style.css';

// libs
import '../libs/zepto.min';
import '../libs/fx.min';

// scale
import calcScale from '../size/scale';
calcScale();

// react
import React, {
    Component
} from 'react';

// react-dom
import {
    render
} from 'react-dom';

// Provider
import {
    Provider
} from 'react-redux';

// store
import configureStore from '../handle/store/configureStore';

// App
import App from '../handle/app';

const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('.wrap')
);