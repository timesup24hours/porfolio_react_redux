import React, { Component } from 'react'
import { connect } from 'react-redux'
var stripe = window.Stripe(process.env.STRIPE_PUBLIC_KEY);
import { hideCreditCardForm } from '../../store/actions/cartActions'
import axios from 'axios'

class StripePay extends Component {

  componentDidMount() {
    const elements = stripe.elements();
    // const total = this.props.cart.total

    let card = elements.create('card', {
      iconStyle: 'solid',
      style: {
        base: {
          iconColor: '#8898AA',
          color: 'black',
          lineHeight: '36px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '19px',

          '::placeholder': {
            color: '#8898AA',
          },
        },
        invalid: {
          iconColor: '#e85746',
          color: '#e85746',
        },
      },
      classes: {
        focus: 'is-focused',
        empty: 'is-empty',
      },
    });
    card.mount('#card-element');

    var inputs = document.querySelectorAll('input.field');
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener('focus', function () {
        input.classList.add('is-focused');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('is-focused');
      });
      input.addEventListener('keyup', function () {
        if (input.value.length === 0) {
          input.classList.add('is-empty');
        } else {
          input.classList.remove('is-empty');
        }
      });
    });



    card.on('change', (event) => {
      this.setOutcome(event);
    });

    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      var form = document.querySelector('form');
      var extraDetails = {
        name: form.querySelector('input[name=cardholder-name]').value,
      };
      stripe.createToken(card, extraDetails).then(this.setOutcome);
    });
  }

  setOutcome = (result) => {
    var successElement = document.querySelector('.success');
    var errorElement = document.querySelector('.error');
    var successPayment = document.querySelector('.success-payment');
    successElement.classList.remove('visible');
    errorElement.classList.remove('visible');

    if (result.token) {
      // Use the token to create a charge or a customer
      // https://stripe.com/docs/charges
      axios.post('/api/charge', {
        stripeToken: result.token,
        chargeAmount: this.props.cart.total,
      })

      // successElement.querySelector('.token').textContent = result.token.id;
      // successElement.classList.add('visible');
      successPayment.classList.add('visible');
    } else if (result.error) {
      errorElement.textContent = result.error.message;
      errorElement.classList.add('visible');
    }
  }

  componentWillUnmount() {
    this.setOutcome = null
  }

  handleHide = e => {
    this.props.hideCreditCardForm()
  }



  render() {
    return (
      <div className='StripePay'>
        <div className='StripePay-mask' onClick={e => this.handleHide(e)}></div>
        <form >
          <div className='success-payment'>
            <div className='success-payment-text'>
              <i className="material-icons">check_circle</i>
              Success!
            </div>
          </div>

          <label>Name
            <input name="cardholder-name" className="is-empty" placeholder="Jane Doe" />
          </label>
          <label>Phone
            <input className="is-empty" type="tel" placeholder="(123) 456-7890" />
          </label>
          <label>Card
            <div id="card-element" className="is-empty"></div>
          </label>

          <button type="submit">Pay ${this.props.cart.total}</button>

          <div className="outcome">
            <div className="error"></div>
            <div className="success">
              Success! <span className="token"></span>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
  hideCreditCardForm: () => dispatch(hideCreditCardForm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StripePay)
