import { createForms } from 'react-redux-form'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Comments } from './Comments'
import { Dishes } from './Dishes'
import { initialFeedback } from './forms'
import { Leaders } from './Leaders'
import { Promotions } from './Promotions'


export const ConfigureStore = () => {
         const store = createStore(combineReducers({
           dishes:Dishes,
           promotions: Promotions,
           leaders:Leaders,
           comments: Comments,
           ...createForms({
             feeback:initialFeedback
           })
         }),
         applyMiddleware(thunk, logger)
         ) 
         return store
       }