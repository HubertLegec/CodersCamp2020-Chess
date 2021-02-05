export class GameUrl {
    private _baseUrl: string;
    private _firstPlayerName: string;
    private _secondPlayerName: string;
    private _gameTime: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    set firstPlayerName(name: string) {
        this._firstPlayerName = name;
    }

    set secondPlayerName(name: string) {
        this._secondPlayerName = name;
    }

    set gameTime(time: string) {
        this._gameTime = time;
    }

    getUrl(): string {
        const searchParamsUrl: URLSearchParams = new URLSearchParams({ 'name1': this._firstPlayerName, 'name2': this._secondPlayerName, 'time': this._gameTime, });
        return this._baseUrl + '?' + searchParamsUrl.toString();
    }
}