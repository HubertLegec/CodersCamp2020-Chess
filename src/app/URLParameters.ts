export class URLParameters {
    private _url: string;

    constructor(url: string){
        this._url = url;
    }
    
    getParams() {
        let params: Array<string> = [];
        const paramsUrl = new URLSearchParams(this._url);
        paramsUrl.forEach(param => params.push(param));
        return params;
    }
}