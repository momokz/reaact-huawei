import {
    createStore
} from 'redux';

// rootReducer
import rootReducer from '../reducers';

const configureStore = () => {
    const store = createStore(rootReducer);
    return store;
};

export default configureStore;