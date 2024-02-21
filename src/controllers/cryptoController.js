import axios from "axios"

const cryptoController = {
    async getPrices(req, res) {
        try {
            const coins = ["bitcoin", "ethereum", "litecoin", "monero", "xrp", "dogecoin", "dash"];
            var response = [];
            coins.forEach(coin => {

                var config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `api.coincap.io/v2/assets/${coin}`,
                    headers: {}
                };

                axios(config)
                    .then(function (resp) {
                        var data = {
                            type: coin,
                            price: resp.data.priceUsd,
                            volume: resp.data.volumeUsd24Hr,
                            change: resp.data.changePercent24Hr
                        }
                        response.push(data);
                    })
            });

            res.status(200).send({ status: "Success", message: response });

        } catch (error) {
            res.status(503).send({ status: "Service Unavailable", message: error.message });
        }
    }
}

export default cryptoController;