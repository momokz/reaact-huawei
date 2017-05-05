import {
    secondState
} from '../action';

const secondReducer = (state = false, action) => {
    switch (action.type) {
        case secondState:
            return action.boolean;
        default:
            return state;
    }
};

export default secondReducer;