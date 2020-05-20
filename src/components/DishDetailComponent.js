import React, {Component} from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle} from 'reactstrap'
class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish : null
         }     
    }
    renderComments(dish){
        if(dish == null){
            return(
                <div></div>
            )
        }
        const comts = dish.comments.map((com)=>{      
            return(
                <li key={com.id} > 
                       <p>{com.comment}</p>
                       <p>{com.author},
                       &nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(com.date))}</p>            
                </li>
            );  
        })
        return(
            <div className="col-12 col-md-5 mt-1">
            <h4>Comments</h4>
            <ul className = "list-unstyled">
              {comts}
            </ul>
        </div>
        )
    }
    renderDish(dish){
        const selectedDishDetail = dish;
        if(selectedDishDetail != null){
            return(     
                <div className="col-12 col-md-5 mt-1">
                  <Card>
                    <CardImg top src={selectedDishDetail.image} alt={selectedDishDetail.name} />
                        <CardBody>
                            <CardTitle>{selectedDishDetail.name}</CardTitle>
                            <CardText>{selectedDishDetail.description}</CardText>
                        </CardBody>
                    </Card>
                </div>  
            );    
        }
        else{    
            return(
                <div></div>
            ) 
        }  
    }
    render(){
        const dishItem = this.renderDish(this.props.dish);
        const commentItem = this.renderComments(this.props.dish);
        return(
        <div className="container">
           <div className="row">
             {dishItem}
             {commentItem}
           </div>
      </div> 
    )
  }
}
export default DishDetail;