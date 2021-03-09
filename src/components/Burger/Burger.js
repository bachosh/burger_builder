import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
console.log(this.props);
 
//(hashivitaa props.ingredients)
    let transformedIngredients = Object.keys( props.ingredients )  //shlis arrayd da abrunebs keys. javascriptis func
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => { // props.ingredients[igKey] abrunebs keys mixedvit values arrays 
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;