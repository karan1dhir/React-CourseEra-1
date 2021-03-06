import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent'
import Home from './HomeComponent';
import About from './AboutComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment,fetchDishes,fetchComments,fetchPromotions,fetchLeaders} from '../redux/ActionCreator';
import {actions} from 'react-redux-form';



const mapStateToProps = (state) =>{
    return{
      dishes : state.dishes,
      comments : state.comments,
      promotions : state.promotions,
      leaders : state.leaders
    }  
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromotions : () => dispatch(fetchPromotions()),
  fetchLeaders : () => dispatch(fetchLeaders()),
  resetFeedbackForm : () => dispatch(actions.reset('feedback'))
});

class Main extends Component{

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchLeaders();
  }

  render(){
  const HomePage = ()=>{
    return(
      <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMsg}
        promotion={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMsg}
        leader={this.props.leaders.leaders.filter((leader)=> leader.featured)[0]}
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMsg}
      />
    )
  }
  const DishWithId = ({match})=>{
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading={this.props.dishes.isLoading}
        isErrMess={this.props.dishes.errMsg}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
        commentsErrMess={this.props.comments.errMsg}
        postComment={this.props.postComment}  
        />
      )
  } 
  const AboutPage = ()=> {
    return(
      <About leaders = {this.props.leaders.leaders}
             leadersLoading={this.props.leaders.isLoading}
             leadersErrMess={this.props.leaders.errMsg}>
        </About>
    )
  } 
  return (
    <div className="App">
    <Header/>
     <Switch location={this.props.location}>
          <Route path="/home"  component={HomePage}/>
          <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}></Menu>}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component= {()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route exact path='/aboutus' component={AboutPage} />
          <Redirect to="/home"/>
     </Switch>
      <Footer/>
    </div>
  );
 }
}

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(Main)));
