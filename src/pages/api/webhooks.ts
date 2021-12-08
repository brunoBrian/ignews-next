import { NextApiRequest, NextApiResponse } from 'next'

import { Readable } from 'stream'
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

async function buffer(readable: Readable) {
  const chunks: any = [];

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set([
  'checkout.session.completed'
])

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const buf = await buffer(req);
    const secret: any = req.headers['stripe-signature'];
    
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET as string)
    } catch(error: any) {
      return res.status(400).json(`Webhook error ${error.message}`)
    }

    const {type} = event;

    if(relevantEvents.has(type)) {
      try {
        switch(type) {
          case 'checkout.session.completed':

          const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription?.toString() as string,
              checkoutSession.customer?.toString() as string,
            )

            break;
          default:
            throw new Error('Unhandled event.')
        }
      } catch(error) {
        return res.json({ error: 'Webhook handler failed.' })
      }
    }
    
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed');
  }
}
