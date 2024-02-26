import { combineReducers } from 'redux';
import { mainReducer } from './main-reducer';

const reducers = combineReducers({
    main: mainReducer,
});

export default reducers;
