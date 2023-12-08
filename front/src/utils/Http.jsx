import Utils from './Utils';
import Vars from "./Vars";
import { toast } from 'react-toastify';

const Http = {
    //  Génération des headers
    defaultHeaders() {
        const headers = new Headers();
        return headers;
    },
    //  Génération des options du call (méthode, body, headers...)
    defaultOptions(hasJson = true) {
        const options = {};
        options.method = "GET";
        options.headers = Http.defaultHeaders();
        hasJson && options.headers.append("Content-Type", "application/json");
        return options;
    },
    handleOups(err) {
        toast.error("Une erreur est survenue !");
    },
    //  Appel web generic
    async call(url = undefined, options = this.defaultOptions(), onResponse = undefined) {
        try {
            //  Lancement du call REST si tout les paramètres sont présents
            if (!Utils.isEmpty(url) && !Utils.isEmpty(onResponse)) {
                //  On retourne l'ensemble de la promesse
                return await fetch(url, options).then((response) => {
                    //  On récupére la réponse serveur => on formate en JSON, avec le code http reçu
                    response.json().then(data => {
                        onResponse(response.status, data, response.headers);
                    });
                });
            }
            else if (!Utils.isEmpty(url)) //  Autrement call classique sans la couche de JSON
                return await fetch(url, options);
        }
        catch (err) {
            this.handleOups(err);
        }
    },

    request_get_list(onResponse = undefined) {
        const options = this.defaultOptions();
        return this.call(Vars.getHost() + '/lists/', options, onResponse);
    },

    request_add_list(title, detail, createdAt, onResponse = undefined) {
        const options = this.defaultOptions();
        options.method = 'POST';
        options.body = JSON.stringify({ "title": title, "detail": detail, "done": false, "updatedAt": createdAt, "createdAt": createdAt });
        return this.call(Vars.getHost() + '/lists/', options, onResponse);
    },

};
export default Http;