import React from 'react';
import Button from '../../UI/Button/Button';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey =>{
        return (
                 <li key={igkey}>
                     <span style={{textTransform: 'capitalize'}}> {igkey}: </span> {props.ingredients[igkey]}
                 </li>
                );
        });
return (
 <Aux>
     <h3>Your Order</h3>
     <p>A delicios burger with the following ingredients:</p>
     <ul>
      {ingredientSummary}
     </ul>
<p><strong>Total Price: {props.price}</strong></p>
     <p>Continue to Checkout?</p>
     <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
     <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>     
 </Aux>
);    
};




export default orderSummary;