import React , {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component  {
    /// some javascript
    /// this.props unda gamoviyenoT
    shouldComponentUpdate(nextProps,  nextState) {
       if (nextProps.show !== this.props.show ) {
           return true;
       }
       else {
           return false;
       }
    }

    componentDidUpdate(){
        console.log('Modal mshobeli elementia. tu ganaxlda da chvenebas davachiret ganaxldeba OrderSummary ');
    }

    render () {
        return(
            <Aux>
                <Backdrop show={ this.props.show}  clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
               ); // JSX vabrunebT
    }
 }
 
 export default Modal;    
