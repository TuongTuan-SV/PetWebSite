import { PayPalButton } from 'react-paypal-button-v2';
import React from 'react';

export default class PayPalButton2 extends React.Component {
  render() {
    const style = {
      layout: 'horizontal',
      color: 'blue',
      shape: 'rect',
      label: 'paypal',
    };
    return (
      <PayPalButton
        style={style}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.props.total,
                },
              },
            ],
            // application_context: {
            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
            // }
          });
        }}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
          this.props.tranSuccess(details);
          // OPTIONAL: Call your server to save the transaction
          //   return fetch("/paypal-transaction-complete", {
          //     method: "post",
          //     body: JSON.stringify({
          //       orderID: data.orderID
          //     })
          //   });
        }}

        //  options={{
        //   currency: "vi-VN"
        // }}
      />
    );
  }
}
