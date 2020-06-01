import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload : comment
})
export const postComment = (dishId,rating,author,comment) => (dispatch) =>{
   
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
    
} 
export const fetchDishes = () =>(dispatch) =>{
    
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}
export const dishesLoading = () =>({
    type : ActionTypes.DISHES_LOADING
})
export const dishesFailed = (errmsg) =>({
   type : ActionTypes.DISHES_FAILED,
   payload: errmsg
})
export const addDishes = (dishes) =>({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
})
export const fetchComments = () =>(dispatch) =>{
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}
export const commentsFailed = (errmsg) =>({
    type : ActionTypes.COMMENTS_FAILED,
    payload: errmsg
 })
 export const addComments = (comments) =>({
     type : ActionTypes.ADD_COMMENTS,
     payload : comments
 })

 export const fetchPromotions = () =>(dispatch) =>{
    dispatch(promotionsLoading());
    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromotions(promos)))
    .catch(error => dispatch(promotionsFailed(error.message)));
}
export const promotionsLoading = () =>({
    type : ActionTypes.PROMOS_LOADING
})
export const promotionsFailed = (errmsg) =>({
   type : ActionTypes.PROMOS_FAILED,
   payload: errmsg
})
export const addPromotions = (promotions) =>({
    type : ActionTypes.ADD_PROMOS,
    payload : promotions
}) 
export const addLeaders = (leaders) =>({
  type : ActionTypes.ADD_LEADERS,
  payload: leaders
})
export const fetchLeaders = () =>(dispatch) =>{ 
  dispatch(leadersLoading(true));
  return fetch(baseUrl + 'leaders')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(dishes => dispatch(addLeaders(dishes)))
  .catch(error => dispatch(leadersFailed(error.message)));
}
export const leadersLoading = () =>({
  type : ActionTypes.LEADERS_LOADING
})
export const leadersFailed = (errmsg) =>({
 type : ActionTypes.LEADERS_FAILED,
 payload: errmsg
})
