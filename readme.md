# [Zibal](https://zibal.ir) IPG NPM Module

Here is Zibal's NPM Module to Easily Create and Process IPG Transactions.

## Get Started
1. Install Module using `npm` or `yarn`
    ```
    npm install zibalts --save-dev
    ```
2. Configure Module 

    ```typescript
    import { Zibal } from "zibalts"

    const zibal = new Zibal({
        merchant: "YOUR_MERCHANT", // Your IPG's Merchant Id (You Can Get it From Zibal's Dashboard)
        callbackUrl: "https://yourwebsite.com/ipg/cb" // The URL Where User will be Redirected to After Payment
    })
    ```
    
    You can Configure These Two Parameters for Each Transaction Too.
    
    You can Specify `merchant: zibal` to Perform Sandbox Transactions.

3. Create IPG Transaction
    ```typescript
    try{
        const result = await zibal.request({
            amount: 200000, // Required - In Rials
            orderId: "ZBL-aaaa", // Optional
            merchant: "YOUR_MERCHANT", // As Said Above, You can Specify merchant for Each Transaction too.
            callbackUrl: "https://yourwebsite.com/ipg/cb", // As Said Above, You can Specify merchant for  Each Transaction too.
            mobile: "09123456789", // Optional - User's Card Numbers will Show inf Dropdown in Shaparak Page if you Send User's Mobile
            description: "THIS IS MY DESCRIPTION", // Optional
            allowedCards: ["5022291092719457"], // Optional - Any Transaction with a Card Number which is not Present in this Array will be Unsuccessful
            linkToPay: true, // Optional - If true, we will generate a Short Link for this transaction.
            sms: true, // Optional - If true, we will Send the Short Link to User's Mobile
        })

                
        // Redirect User to Payment URL after Creating Transaction
        // res.redirect is for Express Framework
        // Store response.trackId Somewhere too
        res.redirect(result.paymentUrl)
    }catch(e:any){
        // show some error
    }

    ```
    
    See [Documentation](https://docs.zibal.ir/IPG/API) For More Features.
    
4. Catch Data in Callback
    
    User will be Redirected to `callbackUrl` you Have Sent in Request. We Will Specify Transaction Information in Query Strings Link:
    
    `https://yourwebsite.com/ipg/cb?trackId=10000&success=1&status=2&orderId=1`
    
    You Shall Catch it in Your Application (ExpressJS, Koa, Hapi, Loopback, Sails, Meteor etc.) and Verify the Transactions if `success === true && status === 2` and Process Your Order for your Customer.
    
5. Verify Transaction
    
    Here you Should Tell Us that You Got the Transaction Information & Verify it.
    
    ```typescript
    try{
        const result = await zibal.verify({
            trackId: 100000, // Required - Transaction's trackId Which we Specify in callback.
            merchant: "YOUR_MERCHANT", // As Said Above, You can Specify merchant for Each Transaction too.
        })
        // ALL SET AND DONE
    }catch(e:any){
        // SHOW SOME ERROR
    }
    ```

6. Done

Your Website is now Connected to Zibal IPG! Enjoy and Have Fun.