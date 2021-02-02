export class ParametersURL {

    getParams(url: string) {
        let params: Array<string> = [];
        const paramsUrl = new URLSearchParams(url);
        paramsUrl.forEach(param => params.push(param));
        return params;
    }

    displayParameters() {
        const params = this.getParams(window.location.search);
        const firstPlayerName = document.getElementById('firstPlayerName');
        const firstPlayerTime = document.getElementById('firstPlayerTime');
        const secondPlayerName = document.getElementById('secondPlayerName');
        const secondPlayerTime = document.getElementById('secondPlayerTime');
        firstPlayerName.innerText = params[0];
        secondPlayerName.innerText = params[1];
        firstPlayerTime.innerText = params[2];
        secondPlayerTime.innerText = params[2];
    }
}