const stripe = require("../config/stripe");
const User = require("../models/user");

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let evnt;
  try {
    evnt = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "webhook error" });
  }
  if (evnt.type == "checkout.session.completed") {
    const session = evnt.data.object;
    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);
    const plan = session.metadata.plan;

    await User.findByIdAndUpdate(userId, {
      $inc: { credits },
      plan,
    });
  }
  return res.json({ received: true });
};

module.exports = { stripeWebhook };
