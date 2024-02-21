import axios from "axios"

const cryptoController = {
    async getPrices(req, res) {
        try {
            var response = [];
            for (let [key, value] of global.mapObject) {
                response.push({key, value});
            }
            console.log(response);
            res.status(200).send({ status: "Success", message: response });

        } catch (error) {
            res.status(503).send({ status: "Service Unavailable", message: error.message });
        }
    }
}

export default cryptoController;