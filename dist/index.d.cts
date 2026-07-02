type resultId = 100 | 102 | 103 | 104 | 105 | 106 | 113 | 140 | 201 | 202 | 203 | "-1";
type statusId = "-100" | "-1" | "-2" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ZibalRequest {
    amount: number;
    callbackUrl?: string;
    orderId?: number;
    merchant?: string;
    mobile?: string;
    multiplexingInfos?: any;
    description?: string;
    linkToPay?: boolean;
    sms?: boolean;
    percentMode?: number;
    feeMode?: number;
    allowedCards?: any;
}
interface ZibalRequestResponse {
    trackId: number;
    result: resultId;
    message: string;
    persianMessage: string;
    success: boolean;
    paymentUrl: string;
}
interface ZibalVerify {
    trackId: number;
    merchant?: string;
}
interface ZibalVerifyResponse {
    message: string;
    result: resultId;
    refNumber: any;
    paidAt: Date;
    status: statusId;
    amount: number;
    orderId: string;
    description: string;
    multiplexingInfos: any[];
    cardNumber: any;
    persianMessage: string;
    success: boolean;
}

declare class Zibal {
    private merchant;
    private callbackUrl;
    constructor(config: {
        merchant: string;
        callbackUrl: string;
    });
    /**
    * Set Merchant Id
    * @param {string} merchant Your Merchant Id
    * */
    private setMerchant;
    /**
    * Initialize Zibal with Your Gateway Merchant Id
    * @param {object} config Your Config Object
    * @param {string} config.merchant Your Zibal Merchant Id
    * @param {string} config.callbackUrl Your Callback Url
    * */
    private init;
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
    request(configs: ZibalRequest): Promise<ZibalRequestResponse>;
    /**
    * Create a Payment Session
    * @param {object} payload Verify Payload
    * @param {string} payload.merchant IPG Merchant Id
    * @param {number} [payload.trackId] IPG Transaction Track Id to be Verified
    * */
    verify(configs: ZibalVerify): Promise<ZibalVerifyResponse>;
}

export { Zibal, type ZibalRequest, type ZibalRequestResponse, type ZibalVerify, type ZibalVerifyResponse };
