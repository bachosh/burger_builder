import React , {Component} from 'react';

import Button from '../../UI/Button/Button';

import Aux from '../../../hoc/Aux/Aux';

class OrderSummary extends Component  {
    componentDidUpdate(){
        console.log('OrderSummary update done');
    }


    render () {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey =>{
        return (
                 <li key={igkey}>
                     <span style={{textTransform: 'capitalize'}}> {igkey}: </span> {this.props.ingredients[igkey]}
                 </li>
                );
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicios burger with the following ingredients:</p>
                <ul>
                {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>     
            </Aux>
            ); // JSX vabrunebT
        }
     };

export default OrderSummary;