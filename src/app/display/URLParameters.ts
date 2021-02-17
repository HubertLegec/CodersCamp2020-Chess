export class URLParameters {
    private _params: Array<string>;

    constructor(url: string) {
        this._params = [];
        const urlSearchParams = new URLSearchParams(url);
        urlSearchParams.forEach(param => this._params.push(param));
    }
    
    getFirstName() {
        return this._params[0];
    }

    getSecondName() {
        return this._params[1];
    }
    
    getTime(){
        return this._params[2];
    }
}