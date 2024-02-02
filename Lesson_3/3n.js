// SETUP: in the Amazon project, update the cart to 2 basketballs ($20.95 each)
// with $4.99 shipping, and 2 t-shirts ($7.99 each) with $4.99 shipping.

// Create fourth line of text: 'Estimated tax (10%):$6.79' (use math and Math.round(...);
// to calculate the exact number).

`Estimated tax (10%): $${Math.round((2 * 2095 + 2 * 799 + 2 * 499) * 0.1) / 100}`