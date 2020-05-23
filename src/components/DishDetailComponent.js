import React from 'react';
import {Link} from 'react-router-dom';
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap'

    function RenderComments({comments}){
        if(comments == null){
            return(
                <div></div>
            )
        }
        const comts = comments.map((com)=>{      
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
            <div>
            <h4>Comments</h4>
            <ul className = "list-unstyled">
              {comts}
            </ul>
        </div>
        )
    }
    function RenderDish({dish}){
        const selectedDishDetail = dish;
        if(selectedDishDetail != null){
            return(     
                <div>
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
    
    const DishDetail = (props) => {
        console.log("DishDetail  component render invoked")
        //const dishItem = this.renderDish(props.dish);
        //const commentItem = this.renderComments(props.dish);
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">     
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
            </div>
        </div>
    )
  }

export default DishDetail;