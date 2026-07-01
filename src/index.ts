import urls from "./urls.js";
import axios from "axios";
import errors from "./errors.js";
import type { ZibalRequest, ZibalRequestResponse, ZibalVerify, ZibalVerifyResponse } from "./types.ts";

export class Zibal {
    private merchant = "zibal";
    private callbackUrl = "";

    /*
  * Initialize Zibal with Your Gateway Merchant Id
  * @param {object} config Your Config Object
  * @param {string} config.merchant Your Zibal Merchant Id
  * @param {string} config.callbackUrl Your Callback Url
  * */
    constructor(config: { merchant: string, callbackUrl: string }) {
        this.init({ merchant: config.merchant, callbackUrl: config.callbackUrl });
    }

    /**
    * Set Merchant Id
    * @param {string} merchant Your Merchant Id
    * */
    private setMerchant(merchant: string) {
        this.merchant = merchant;
    }

    /**
    * Initialize Zibal with Your Gateway Merchant Id
    * @param {object} config Your Config Object
    * @param {string} config.merchant Your Zibal Merchant Id
    * @param {string} config.callbackUrl Your Callback Url
    * */
    private init({ merchant, callbackUrl }: { merchant: string, callbackUrl: string }) {
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
    async request(configs: ZibalRequest): Promise<ZibalRequestResponse> {
        configs.merchant = configs.merchant ?? this.merchant
        configs.callbackUrl = configs.callbackUrl ?? this.callbackUrl
        console.log("configs: ", configs);

        const result = await axios.default.post(urls.requestURL, configs)
        const data: ZibalRequestResponse = result.data || {};
        data.persianMessage = errors.getPersianMessage(data.result);
        if (result.data.result !== 100) {
            data.success = false;
            return data
        } else {
            data.success = true;
            data.paymentUrl = urls.getStartUrl(data.trackId);
            return data
        }
    }


    /**
    * Create a Payment Session
    * @param {object} payload Verify Payload
    * @param {string} payload.merchant IPG Merchant Id
    * @param {number} [payload.trackId] IPG Transaction Track Id to be Verified
    * */
    async verify(configs: ZibalVerify): Promise<ZibalVerifyResponse> {
        const result = await axios.default.post(urls.verifyURL, {
            trackId: configs.trackId, merchant: configs.merchant ?? this.merchant
        })
        const data = result.data || {};
        data.persianMessage = errors.getPersianMessage(data.result);
        if (result.data.result !== 100) {
            data.success = false;
            return data;
        } else {
            data.success = true;
            return data;
        }
    }

}