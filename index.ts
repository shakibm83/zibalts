import urls from "./urls.ts";
import axios from "axios";
import errors from "./errors.ts";



export class Zibal {
    merchant = "zibal";
    callbackUrl = "";
    /*
  * Initialize Zibal with Your Gateway Merchant Id
  * @param {object} config Your Config Object
  * @param {string} config.merchant Your Zibal Merchant Id
  * @param {string} config.callbackUrl Your Callback Url
  * */
    constructor(config: { merchant?: string, callbackUrl: string }) {
        this.init({ merchant: config.merchant ?? "zibal", callbackUrl: config.callbackUrl });
    }

    /**
    * Set Merchant Id
    * @param {string} merchant Your Merchant Id
    * */
    setMerchant(merchant: string) {
        this.merchant = merchant;
    }

    /**
    * Initialize Zibal with Your Gateway Merchant Id
    * @param {object} config Your Config Object
    * @param {string} config.merchant Your Zibal Merchant Id
    * @param {string} config.callbackUrl Your Callback Url
    * */
    init({ merchant, callbackUrl }: { merchant: string, callbackUrl: string }) {
        this.setMerchant(merchant);
        this.callbackUrl = callbackUrl;
    }

    /**
    * Create a Payment Session
    * @param {object} payload Request Payload
    * @param {number} payload.amount Transaction Amount (Required)
    * @param {string} [payload.merchant] Specify Merchant if you Haven't Specify in Class Config
    * @param {string} [payload.callbackUrl] Url which User will be Redirected to After Payment
    * @param {string} [payload.description] Transaction's Description
    * @param {string} [payload.orderId] Transaction Order Id
    * @param {string} [payload.mobile] User's Mobile (09123456789)
    * @param {number} [payload.feeMode=0] Transaction Fee Mode
    * @param {boolean} [payload.linkToPay=false] If you want us to Generate a Short Link, send this: true
    * @param {boolean} [payload.sms=false] If you want us to Send the Short Link to User's Mobile, send this: true
    * @param {number} [payload.percentMode=0] Whether to Calculate Each Submerchant Share with Percent
    * @param {Array} [payload.multiplexingInfos=[]] Multiplexing for this Transaction
    * @param {Array} [payload.allowedCards=[]] Array of Allowed Full Card Numbers for this Transaction
    * @return {Promise<{}>} Promise will Resolve After HTTP Call is Successful
    * @example
    *   request({amount: 20000})
    *
    * */
    request({
        amount,
        callbackUrl = this.callbackUrl,
        merchant = this.merchant,
        orderId,
        mobile,
        multiplexingInfos,
        description,
        allowedCards,
        linkToPay = false,
        sms = false,
        percentMode = 0,
        feeMode = 0
    }: {
        amount: number,
        callbackUrl?: string,
        orderId?: number,
        merchant?: string,
        mobile?: string,
        multiplexingInfos?: any,
        description?: string,
        linkToPay?: boolean,
        sms?: boolean,
        percentMode?: number,
        feeMode?: number
        allowedCards?: any
    }) {
        return new Promise((resolve, reject) => {
            axios.post(urls.requestURL, {
                amount,
                callbackUrl,
                merchant,
                orderId,
                mobile,
                multiplexingInfos,
                description,
                allowedCards,
                percentMode,
                feeMode,
                linkToPay,
                sms
            }).then(res => {
                const data = res.data || {};
                data.persianMessage = errors.getPersianMessage(data.result);
                if (res.data.result !== 100) {
                    data.success = false;
                    resolve(data);
                } else {
                    data.success = true;
                    data.paymentUrl = urls.getStartUrl(data.trackId);
                    resolve(data);
                }
            }).catch(error => {
                resolve({
                    success: false
                })
            });
        })
    }


    /**
    * Create a Payment Session
    * @param {object} payload Verify Payload
    * @param {string} payload.merchant IPG Merchant Id
    * @param {number} [payload.trackId] IPG Transaction Track Id to be Verified
    * */
    verify({ merchant = this.merchant, trackId }: { merchant: string, trackId: number }) {
        return new Promise((resolve, reject) => {
            axios.post(urls.verifyURL, {
                merchant,
                trackId
            }).then(res => {
                const data = res.data || {};
                data.persianMessage = errors.getPersianMessage(data.result);
                if (res.data.result !== 100) {
                    data.success = false;
                    reject(data);
                } else {
                    data.success = true;
                    resolve(data);
                }
            }).catch(error => {
                console.log(error);
                resolve({
                    success: false
                })
            });
        })
    }

}

module.exports = Zibal;