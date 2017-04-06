import { stripe as stripeConfig } from '../../../config'
import { asyncRequest } from '../../util'
import stripePackage from 'stripe'
let stripe
if(process.env.NODE_ENV !== 'production') {
  stripe = stripePackage(stripeConfig.testSecretKey)
} else {
  stripe = stripePackage(stripeConfig.liveSecretKey)
}

export default (app) => {

  app.post('/api/charge', asyncRequest(async (req, res, next) => {
    const token = req.body.stripeToken
    const chargeAmount = req.body.chargeAmount
    console.log('token ', token);
    console.log('chargeAmount ', chargeAmount);
    let charge = stripe.charges.create({
      amount: chargeAmount,
      currency: 'usd',
      description: "Example charge",
      source: token,
    }, (err, charge) => {
      if(err && err.type === 'StripeCardError') {
        console.log('your card was decliend');
      }
      // req.user.customData.balance += charge.amount
      // req.user.customData.save((err) => {
      //   if(err) console.log(err);
      // })
      console.log('charge ', charge);
    })
    console.log('your payment was successful');
    res.status(201).json({ success: true })

  }))


}
