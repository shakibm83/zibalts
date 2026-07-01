// src/urls.ts
var rootAPIUrl = "https://gateway.zibal.ir/";
var urls = {
  requestURL: `${rootAPIUrl}v1/request`,
  startURL: `${rootAPIUrl}start/`,
  verifyURL: `${rootAPIUrl}v1/verify`
};
var urls_default = {
  ...urls,
  getStartUrl: (trackId) => {
    return `${urls.startURL}${trackId}`;
  }
};

// src/index.ts
import axios from "axios";

// src/errors.ts
var results = {
  100: "\u0645\u0648\u0641\u0642",
  102: "merchant \u06CC\u0627\u0641\u062A \u0646\u0634\u062F.",
  103: "merchant \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A. \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0645\u0627\u0633 \u062D\u0627\u0635\u0644 \u06A9\u0646\u06CC\u062F.",
  104: "merchantId \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A.",
  105: "\u0645\u0628\u0644\u063A \u0628\u0627\u06CC\u062F \u0627\u0632 1,000 \u0631\u06CC\u0627\u0644 \u0628\u0632\u0631\u06AF\u062A\u0631 \u0628\u0627\u0634\u062F",
  106: "callbackUrl \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A.",
  113: "\u0645\u0628\u0644\u063A \u0628\u0627\u06CC\u062F \u0627\u0632 500,000,000 \u0631\u06CC\u0627\u0644 \u06A9\u0645\u062A\u0631 \u0628\u0627\u0634\u062F.",
  140: "callbackUrl \u0627\u0631\u0633\u0627\u0644 \u0646\u0634\u062F\u0647.",
  201: "\u0642\u0628\u0644\u0627 \u062A\u0627\u06CC\u06CC\u062F \u0634\u062F\u0647.",
  202: "\u0633\u0641\u0627\u0631\u0634 \u067E\u0631\u062F\u0627\u062E\u062A \u0646\u0634\u062F\u0647 \u06CC\u0627 \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F\u0647 \u0627\u0633\u062A.",
  203: "trackId \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A.",
  "-1": "\u062E\u0637\u0627"
};
var statuses = {
  "-100": "\u062E\u0637\u0627",
  "-1": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0631\u062F\u0627\u062E\u062A",
  "-2": "\u062E\u0637\u0627\u06CC \u062F\u0627\u062E\u0644\u06CC",
  1: "\u067E\u0631\u062F\u0627\u062E\u062A \u0634\u062F\u0647 - \u062A\u0627\u06CC\u06CC\u062F\u0634\u062F\u0647",
  2: "\u067E\u0631\u062F\u0627\u062E\u062A \u0634\u062F\u0647 - \u062A\u0627\u06CC\u06CC\u062F\u0646\u0634\u062F\u0647",
  3: "\u0644\u063A\u0648\u0634\u062F\u0647 \u062A\u0648\u0633\u0637 \u06A9\u0627\u0631\u0628\u0631",
  4: "\u0634\u0645\u0627\u0631\u0647 \u06A9\u0627\u0631\u062A \u0646\u0627\u0645\u0639\u062A\u0628\u0631",
  5: "\u0645\u0648\u062C\u0648\u062F\u06CC \u062D\u0633\u0627\u0628 \u0646\u0627\u06A9\u0627\u0641\u06CC",
  6: "\u0631\u0645\u0632 \u0627\u0634\u062A\u0628\u0627\u0647",
  7: "\u062A\u0639\u062F\u0627\u062F \u062F\u0631\u062E\u0648\u0627\u0633\u062A\u200C\u0647\u0627 \u0628\u06CC\u0634 \u0627\u0632 \u062D\u062F \u0645\u062C\u0627\u0632",
  8: "\u062A\u0639\u062F\u0627\u062F \u067E\u0631\u062F\u0627\u062E\u062A \u0627\u06CC\u0646\u062A\u0631\u0646\u062A\u06CC \u0631\u0648\u0632\u0627\u0646\u0647 \u0628\u06CC\u0634 \u0627\u0632 \u062D\u062F \u0645\u062C\u0627\u0632",
  9: "\u0645\u0628\u0644\u063A \u067E\u0631\u062F\u0627\u062E\u062A \u0627\u06CC\u0646\u062A\u0631\u0646\u062A\u06CC \u0631\u0648\u0632\u0627\u0646\u0647 \u0628\u06CC\u0634 \u0627\u0632 \u062D\u062F \u0645\u062C\u0627\u0631",
  10: "\u0635\u0627\u062F\u0631\u06A9\u0646\u0646\u062F\u0647 \u06A9\u0627\u0631\u062A \u0646\u0627\u0645\u0639\u062A\u0628\u0631",
  11: "\u062E\u0637\u0627\u06CC \u0633\u0648\u06CC\u06CC\u0686",
  12: "\u06A9\u0627\u0631\u062A \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u062F\u0633\u062A\u0631\u0633\u06CC"
};
var errors_default = {
  getPersianMessage: (result = "-1") => {
    return results[result];
  },
  getPersianStatus: (status = "-100") => {
    return statuses[status];
  }
};

// src/index.ts
var Zibal = class {
  merchant = "zibal";
  callbackUrl = "";
  /*
  * Initialize Zibal with Your Gateway Merchant Id
  * @param {object} config Your Config Object
  * @param {string} config.merchant Your Zibal Merchant Id
  * @param {string} config.callbackUrl Your Callback Url
  * */
  constructor(config) {
    this.init({ merchant: config.merchant, callbackUrl: config.callbackUrl });
  }
  /**
  * Set Merchant Id
  * @param {string} merchant Your Merchant Id
  * */
  setMerchant(merchant) {
    this.merchant = merchant;
  }
  /**
  * Initialize Zibal with Your Gateway Merchant Id
  * @param {object} config Your Config Object
  * @param {string} config.merchant Your Zibal Merchant Id
  * @param {string} config.callbackUrl Your Callback Url
  * */
  init({ merchant, callbackUrl }) {
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
  async request(configs) {
    configs.merchant = configs.merchant ?? this.merchant;
    configs.callbackUrl = configs.callbackUrl ?? this.callbackUrl;
    console.log("configs: ", configs);
    const result = await axios.default.post(urls_default.requestURL, configs);
    const data = result.data || {};
    data.persianMessage = errors_default.getPersianMessage(data.result);
    if (result.data.result !== 100) {
      data.success = false;
      return data;
    } else {
      data.success = true;
      data.paymentUrl = urls_default.getStartUrl(data.trackId);
      return data;
    }
  }
  /**
  * Create a Payment Session
  * @param {object} payload Verify Payload
  * @param {string} payload.merchant IPG Merchant Id
  * @param {number} [payload.trackId] IPG Transaction Track Id to be Verified
  * */
  async verify(configs) {
    const result = await axios.default.post(urls_default.verifyURL, {
      trackId: configs.trackId,
      merchant: configs.merchant ?? this.merchant
    });
    const data = result.data || {};
    data.persianMessage = errors_default.getPersianMessage(data.result);
    if (result.data.result !== 100) {
      data.success = false;
      return data;
    } else {
      data.success = true;
      return data;
    }
  }
};
export {
  Zibal
};
