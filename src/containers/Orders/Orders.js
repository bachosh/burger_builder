import React , {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component  {

   state = {
      orders: [],
      loading: true
   }

   componentDidMount() {
      axios.get('/orders.json')
      .then(res => {
         //console.log(res.data);
         // aq vakitxavt google s firebase s, romelic gvibrunebs objects da ara arrays/
         // gardavqmniT am objects arrayd
         const fetchedOrders = [];
         for (let key in res.data) {
            fetchedOrders.push({  // aq fetchedOrders array shi vamatebt objectebs
              ...res.data[key],
              id: key
            });
         }
         this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(err => {
         this.setState({loading: false});
      }
      )
   }

   render () {
       return(
              <div> 
                 {this.state.orders.map( order => (
                   <Order 
                     key={order.id}
                     ingredients={order.ingredients}
                     price={order.price}
                  /> 
                 ))}
              </div>
              );
   }
}

export default withErrorHandler(Orders,axios);