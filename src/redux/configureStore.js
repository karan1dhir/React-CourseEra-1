import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Dishes} from '../redux/dishes';
import {Comments} from '../redux/comments';
import {Leaders} from '../redux/leaders';
import {Promotions} from '../redux/promotions';
import thunk from 'redux-thunk';
import {createForms} from 'react-redux-form';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';


export const ConfigureStore = () =>{
    const store = createStore(combineReducers({
        dishes : Dishes,
        comments : Comments,
        leaders : Leaders,
        promotions : Promotions,
        ...createForms({
            feedback : InitialFeedback
        })
    }),
    applyMiddleware(thunk,logger)
    );
    return store;
}
