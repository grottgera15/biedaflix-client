export default class Api {
    static paramsToPath(apiParams) {
        let apiParamsPath = "";
        for (let apiParam in apiParams) {
            if (apiParam !== undefined)
                apiParamsPath += `${apiParam}=${apiParams[apiParam]}&`;
        }
       return apiParamsPath;
    }
}