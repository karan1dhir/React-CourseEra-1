import React from 'react';
import {Link} from 'react-router-dom';
import {Card,CardImg,CardImgOverlay,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap'
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

  function RenderMenuItem({dish}){
      return(
        <Card>
        <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl+ dish.image} alt={dish.image}></CardImg>
          <CardImgOverlay>
             <CardTitle>{dish.name}</CardTitle>
           </CardImgOverlay>
           </Link>
        </Card>
    )
  }  
   const Menu = (props) =>{
    console.log('Menu component render invoked')
    const menu = props.dishes.dishes.map((dish)=>{
        return (
              <div key={dish.id}  className="col-12 col-md-5 mt-1">
                 <RenderMenuItem dish={dish} />
              </div>  
        );
    });
    if(props.dishes.isLoading){
      return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
      )
    }
    else if (props.dishes.errMsg){
      return(
          <div className="container">
          <div className="row">
              <h4>{props.dishes.errMsg}</h4>
          </div>
      </div>
      )
  }
  else{
    return(
        <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>Menu</h3>
              <hr/>
            </div>
        </div>
            <div className="row">
                  {menu}
            </div>
        </div> 
    );
  }
}
export default Menu;