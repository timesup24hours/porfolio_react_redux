import React, { Component } from 'react'
import { connect } from 'react-redux'
const stripe = window.Stripe(process.env.STRIPE_PUBLIC_KEY)
import * as cartActions from '../../store/actions/cartActions'

class StripePay extends Component {
  componentDidMount() {
    const elements = stripe.elements()

    // create input element from stripe libaray
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
            color: '#8898AA'
          }
        },
        invalid: {
          iconColor: '#e85746',
          color: '#e85746'
        }
      },
      classes: {
        focus: 'is-focused',
        empty: 'is-empty'
      }
    })
    card.mount('#card-element')

    // get all the input field and loop through to add listen event in order to add class and remove class
    var inputs = document.querySelectorAll('input.field')
    Array.prototype.forEach.call(inputs, function(input) {
      input.addEventListener('focus', function() {
        input.classList.add('is-focused')
      })
      input.addEventListener('blur', function() {
        input.classList.remove('is-focused')
      })
      input.addEventListener('keyup', function() {
        if (input.value.length === 0) {
          input.classList.add('is-empty')
        } else {
          input.classList.remove('is-empty')
        }
      })
    })

    // listen on change even and fire the setOutcome method
    card.on('change', event => {
      this.setOutcome(event)
    })

    // listen the on submit event, collect the data, prepare token and finally fire the setOutcome method
    document.querySelector('form').addEventListener('submit', e => {
      e.preventDefault()
      var form = document.querySelector('form')
      var extraDetails = {
        name: form.querySelector('input[name=cardholder-name]').value
      }
      stripe.createToken(card, extraDetails).then(this.setOutcome)
    })
  }

  // set error and success message if token is created or not and call the paymentRequestEpic when token is created
  setOutcome = result => {
    var successElement = document.querySelector('.success')
    var errorElement = document.querySelector('.error')
    successElement.classList.remove('visible')
    errorElement.classList.remove('visible')

    if (result.token) {
      // Use the token to create a charge or a customer
      // https://stripe.com/docs/charges
      this.props.paymentRequest({
        stripeToken: result.token,
        chargeAmount: this.props.cart.total
      })

      // successElement.querySelector('.token').textContent = result.token.id;
      // successElement.classList.add('visible');
    } else if (result.error) {
      errorElement.textContent = result.error.message
      errorElement.classList.add('visible')
    }
  }

  // compare thisProps and nextProps to update the UI, when payment epic success
  componentWillReceiveProps(nextProps) {
    if (!this.props.payment.success === nextProps.payment.success) {
      this.props.emptyCartRequest()
      document.querySelector('.success-payment').classList.add('visible')
    }
  }

  // clear the memory
  componentWillUnmount() {
    this.setOutcome = null
  }

  // hide the form when onclick
  handleHide = e => {
    this.props.hideCreditCardForm()
  }

  render() {
    return (
      <div className="StripePay">
        <div className="StripePay-mask" onClick={e => this.handleHide(e)} />
        <form>
          <div className="success-payment">
            <div className="success-payment-text">
              <i className="material-icons">check_circle</i>
              Success!
            </div>
          </div>

          <label>
            <input
              name="cardholder-name"
              className="field is-empty"
              placeholder="Jane Doe"
            />
            <span><span>Name</span></span>
          </label>
          <label>
            <input
              className="field is-empty"
              type="tel"
              placeholder="(123) 456-7890"
            />
            <span><span>Phone</span></span>
          </label>
          <label>
            <div id="card-element" className="field is-empty" />
            <span><span>Card</span></span>
          </label>
          <button type="submit">Pay ${this.props.cart.total}</button>
          <div className="outcome">
            <div className="error" />
            <div className="success">
              Success! Your Stripe token is <span className="token" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  payment: state.payment
})
const mapDispatchToProps = dispatch => ({
  hideCreditCardForm: () => dispatch(cartActions.hideCreditCardForm()),
  paymentRequest: () => dispatch(cartActions.paymentRequest()),
  emptyCartRequest: () => dispatch(cartActions.emptyCartRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(StripePay)
