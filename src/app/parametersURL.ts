export class ParametersURL {
    getParams(url: string) {
        let params = {};
        const parser = document.createElement('a');
        parser.href = url;
        let query = parser.search.substring(1);
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }


    displayParameters() {
        const params = this.getParams(window.location.href);
        const firstPlayerName = document.getElementById('firstPlayerName');
        const firstPlayerTime = document.getElementById('firstPlayerTime');
        const secondPlayerName = document.getElementById('secondPlayerName');
        const secondPlayerTime = document.getElementById('secondPlayerTime');
        firstPlayerName.textContent = params[0];
        secondPlayerName.textContent = params[1];
        firstPlayerTime.textContent = params[2];
        secondPlayerTime.textContent = params[2];
    }

}