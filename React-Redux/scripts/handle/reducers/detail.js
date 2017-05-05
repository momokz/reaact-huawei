import {
    openLayer,
    closeLayer,
    navTab
} from '../action';

const showReducer = (state = {
    hot: {
        show: false,
        layer: false
    },
    area: {
        show: false,
        layer: false
    },
    date: {
        show: false
    },
    activities: {
        show: false
    }
}, action) => {
    switch (action.type) {
        case openLayer:
            return Object.assign({}, state, action.layer);
        case closeLayer:
            return Object.assign({}, state, action.layer);
        case navTab:
            return Object.assign({}, state, action.show);
        default:
            return state;
    }
};

export default showReducer;