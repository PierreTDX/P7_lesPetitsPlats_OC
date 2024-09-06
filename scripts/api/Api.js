export default class Api {
    constructor(url){
        this.url = url;
    }
    async get(){
        try{
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch(error) {
            console.error("Erreur sur l'API", error);
        }
    }
};