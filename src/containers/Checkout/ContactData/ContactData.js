import React , {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
   state ={
            orderForm: {
                    name: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Your Name'
                            },
                            value: '',
                            validation: {
                                required: true
                            },
                            valid: false,
                            touched: false
                          },
                    street:{
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Street'
                            },
                            value: '',
                            validation: {
                                required: true
                            },
                            valid: false,
                            touched: false                        
                           },
                    zipcode: {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'Zip Code'
                                },
                                value: '',
                                validation: {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 5
                                },
                                valid: false ,
                                touched: false                         
                            },
                    country: {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'Country'
                                },
                                value: '',
                                validation: {
                                    required: true
                                },
                                valid: false ,
                                touched: false                        
                            },
                    email: {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'email',
                                    placeholder: 'Your E-MAIL'
                                },
                                value: '',
                                validation: {
                                    required: true
                                },
                                valid: false ,
                                touched: false                        
                            },
                    deliveryMethod: {
                                        elementType: 'select',
                                        elementConfig: {
                                        options: [
                                                    {value: 'fastest', displayValue: 'Fastest'},
                                                    {value: 'cheapest', displayValue: 'Cheapest'}
                                                 ]
                                        },
                                        validation: {
                                            required: false
                                        },
                                        value: '',
                                        valid: true    
                                    }
            },
                formIsValid: false,
                loading: false
           }

    orderhandler = (event) => {
      event.preventDefault(); // event davamatet tavidan rom ar chatvirtuliyo gverdi reloadi rom ar eqna
      // send a request and reload
      //console.log(this.props.ingredients);  
        this.setState({ loading: true});
        const formdata = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formdata[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: this.formData
        }

        // .json marto firebazis gamo gvaq mititebuli
        axios.post('orders.json',order)
        .then(response => {
            this.setState({ loading: false});
            this.props.history.push('/');
        })
        .catch(error => 
            {this.setState({ loading: false});
        }); 


    }

    checkValidity(value, rules) {
     let isValid = true;

     if (rules.required) {
        isValid = value.trim() !== '' && isValid;
     }

     if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
     }

     if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
     }

     return isValid;
    }

    inputChangehandler = (event,inputIdentifier) => {
        //console.log(event.target.value);
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;////????
 
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched= true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //console.log(updatedFormElement);
        let formIsValid =true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid =  updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
console.log('inputChangehandler >>>>>>');
console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
console.log(this.state.formIsValid);       
    }

    render () {

        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form =(
            <form onSubmit={this.orderhandler}>

                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType = {formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangehandler(event,formElement.id)}

                    >
                    </Input>    
                ))}
                <Button 
                   btnType  = "Success"
                   disabled = {!this.state.formIsValid}
                >
                     Order 
                </Button>
            </form>
        );

        if (this.state.loading) {
            form= <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;