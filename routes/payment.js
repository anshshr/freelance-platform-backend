const express=require('express');
const router=express.Router();
const paypal = require('paypal-rest-sdk');
paypal.configure({
    "mode": 'sandbox',
    "client_id": process.env.PAYPAL_CLIENT_ID,
    "client_secret": process.env.PAYPAL_SECRET
})
router.post("/", async (req, res) => {
    const {amount} = await req.body;
     if(!amount){
         return res.status(400).json({message:"Amount is required"});
     }
     try {
         let create_payment_json = {
             "intent": "sale",
             "payer": {
                 "payment_method": "paypal"
             },
             "redirect_urls": {
                 "return_url": "http://localhost:8080/payment/success/",
                 "cancel_url": "http://localhost:8080/payment/failed/"
             },
             "transactions": [{
                 "item_list": {
                     "items": [{
                         "name": "item",
                         "sku": "item",
                         "price": amount,
                         "currency": "USD",
                         "quantity": 1
                     }]
                 },
                 "amount": {
                     "currency": "USD",
                     "total": amount
                 },
                 "description": "This is the payment description."
             }]
         };
         await paypal.payment.create(create_payment_json, function (error, payment) {
             if (error) {
                 throw error;
             } else {
                 console.log("Create Payment Response");
                 console.log(payment);
                 let data = payment;
                 res.json(data);
             }
         });
     } catch (error) {
         console.log(error);
     }
})
router.get('/success', async (req, res) => {
    console.log(req.url)
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            // "transactions": [{
            //     "amount": {
            //         "currency": "USD",
            //         "total": "69.00"
            //     }
            // }]
        }
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error)
                return res.redirect("http://localhost:5173/failed");
            } else {
                console.log("Execute Payment Response");
                // console.log(payment);
                const response = JSON.stringify(payment);
                const parsedResponse = JSON.parse(response);

                const transactions = parsedResponse.transactions[0];

                console.log("transactions", transactions);

                return res.redirect("http://localhost:5173/success");
            }
        })
    } catch (error) {
        console.log(error);
    }
    return res.redirect("http://localhost:5173/success");
})
router.get('/failed', async (req, res) => {

    return res.redirect("http://localhost:5173/failed");
})
module.exports=router;