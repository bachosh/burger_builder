import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: 
            //{
            //salad: 0,
            //bacon: 0,
            //cheese: 0,
            //meat: 0         },
            null,

        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        Loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-my-burger-1545c-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
         .then(response => {
             //console.log(response);
             this.setState({ingredients: response.data});
         }
         ).catch(error => { this.setState({error: true})});
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

      purchaseHandler = () => {
          this.setState({purchasing: true});
      }

      purchaseCancelHandler = () => {
        this.setState({purchasing: false});
      }

      purchaseContinueHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        } //encodeURiComponent  url istvis amzadebs strings

        queryParams.push('price=' + this.state.totalPrice); 
        const  queryString = queryParams.join('&');      
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        }            
        );
        console.log('BurgerBuilder-purchaseContinueHandler-queryString: ' + queryString);
      }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null ;
        let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredienthandler}
                        ingredientRemoved={this.removeIngredienthandler}  
                        disabled = {disabledInfo} 
                        purchaseable = {this.state.purchaseable}
                        ordered = {this.purchaseHandler}
                        price = {this.state.totalPrice}               
                    />  
                </Aux>
            );
            orderSummary = <OrderSummary 
                                        ingredients = {this.state.ingredients}
                                        purchaseCancelled = {this.purchaseCancelHandler}
                                        purchaseContinued = {this.purchaseContinueHandler}
                                        price = {this.state.totalPrice}
                                    />  ;

        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        };

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorhandler(BurgerBuilder,axios);