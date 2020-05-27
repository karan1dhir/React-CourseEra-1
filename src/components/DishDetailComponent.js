import React,{Component } from 'react';
import {Link} from 'react-router-dom';
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap'
import { Button,Modal,ModalHeader,ModalBody,Row,Col,Label} from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !(val) || (val.length <= len);
const minlength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    handleSubmit(values){
        this.toggleModal();
        console.log(JSON.stringify(values));
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
    }
    render(){
        return(
            <>
            <Button outline  onClick={this.toggleModal}>
             <span className="fa fa-pencil-square-o">Submit Comment</span>
           </Button>
           <Modal isOpen= {this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>
                                    Rating
                                </Label>
                            <Col md={{ size: 12 }}>
                                <Control.select
                                model=".rating"
                                name="rating"
                                className="form-control"
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                            </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="authorName" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".authorName" id="authorName" name="authorName"
                                        placeholder="Your Name"
                                        validators={{
                                            required,
                                            minlength: minlength(3),
                                            maxlength: maxlength(15),
                                        }}
                                        className="form-control"/> 
                                        <Errors className="text-danger" model=".authorName" show="touched" messages={{
                                            required : 'Required',
                                            minlength : 'Must be greater than 2 character',
                                            maxlength : 'Must be 15 characters or less',

                                        }}>
                                    </Errors>   
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"></Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
        )
    }
}
    function RenderComments({comments,addComment,dishId}){
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
            <CommentForm dishId={dishId} addComment={addComment}/>
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
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.isErrMess){
            return(
                <div className="container">
                <div className="row">
                    <h4>{props.isErrMess}</h4>
                </div>
            </div>
            )
        }
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
                <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
               
            </div>
            </div>
        </div>
    )
  }

export default DishDetail;
