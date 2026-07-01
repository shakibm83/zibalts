const rootAPIUrl = "https://gateway.zibal.ir/";
const urls = {
    requestURL: `${rootAPIUrl}v1/request`,
    startURL: `${rootAPIUrl}start/`,
    verifyURL: `${rootAPIUrl}v1/verify`,
};
export default   {
    ...urls,
    getStartUrl: (trackId:number) => {
        return `${urls.startURL}${trackId}`
    }
}