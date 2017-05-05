import {
    combineReducers
} from 'redux';

// reducers
import secondReducer from './visibility';
import showReducer from './detail';

const rootReducer = combineReducers({
    secondReducer,
    showReducer
});

export default rootReducer;