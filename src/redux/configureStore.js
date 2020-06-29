import { combineReducers, createStore } from 'redux'
import { Comments } from './Comments'
import { Dishes } from './Dishes'
import { Leaders } from './Leaders'
import { Promotions } from './Promotions'


export const ConfigureStore = () => {
         const store = createStore(combineReducers({
           dishes:Dishes,
           promotions: Promotions,
           leaders:Leaders,
           comments: Comments
         }))
         return store
       }