import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }



    updatePurchaseState (ingredients) {

      const sum= Object.keys(ingredients)
        .map(igKey =>{
          return ingredients[igKey];
         }).reduce((sum,el) => {
             return sum + el;
                               }
                  ,0);
      this.setState({purchaseable: sum > 0 });             
    }

    addIngredienthandler =(type) => {
      const oldCount = this.state.ingredients[type];
      const UpdatedCunt = oldCount + 1;
      const UpdatedIngredients = {
          ...this.state.ingredients
      };
      UpdatedIngredients[type] = UpdatedCunt; 
      const priceAdition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAdition;
      this.setState({totalPrice: newPrice, ingredients: UpdatedIngredients});
      this.updatePurchaseState(UpdatedIngredients);
    }

    removeIngredienthandler =(type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount<=0) {
            return;
        }
        const UpdatedCunt = oldCount - 1;
        const UpdatedIngredients = {
            ...this.state.ingredients
        };
        UpdatedIngredients[type] = UpdatedCunt; 
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: UpdatedIngredients});
        this.updatePurchaseState(UpdatedIngredients);        
      }
    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Modal>
                   <OrderSummary ingredients = {this.state.ingredients}/>    
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                  ingredientAdded={this.addIngredienthandler}
                  ingredientRemoved={this.removeIngredienthandler}  
                  disabled = {disabledInfo} 
                  purchaseable = {this.state.purchaseable}
                  price = {this.state.totalPrice}               
                />             
            </Aux>
        );
    }
}

export default BurgerBuilder;