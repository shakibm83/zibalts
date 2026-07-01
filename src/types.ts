import type { resultId, statusId } from "./errors.js"


export interface ZibalRequest {
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
}
export interface ZibalRequestResponse {
    trackId: number,
    result: resultId,
    message: string,
    persianMessage: string,
    success: boolean,
    paymentUrl: string
}

export interface ZibalVerify {
    trackId: number,
    merchant?: string
}
export interface ZibalVerifyResponse {
    message: string,
    result: resultId,
    refNumber: any,
    paidAt: Date,
    status: statusId,
    amount: number,
    orderId: string,
    description: string,
    multiplexingInfos: any[],
    cardNumber: any,
    persianMessage: string,
    success: boolean
}
