import {createStore,combineReducers} from 'redux';
import {Dishes} from '../redux/dishes';
import {Comments} from '../redux/comments';
import {Leaders} from '../redux/leaders';
import {Promotions} from '../redux/promotions';


export const ConfigureStore = () =>{
    const store = createStore(combineReducers({
        dishes : Dishes,
        comments : Comments,
        leaders : Leaders,
        promotions : Promotions
    }));
    return store;
}
