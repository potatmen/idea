import axios from "axios"

const cryptoController = {
    async getPrices(req, res) {
        try {
            const coins = ["bitcoin", "ethereum", "litecoin", "monero", "xrp", "dogecoin", "dash"];
            var response = [];

            for (const coin of coins) {
                //console.log("here");
                var config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://api.coincap.io/v2/assets/${coin}`,
                    headers: {}
                };
                
                await axios(config)
                    .then(function (resp) {
                        //console.log(resp.data.data);
                        var data = {
                            type: coin,
                            price: resp.data.data.priceUsd,
                            volume: resp.data.data.volumeUsd24Hr,
                            change: resp.data.data.changePercent24Hr
                        }
                        response.push(data);
                    });
            }
            res.status(200).send({ status: "Success", message: response });

        } catch (error) {
            res.status(503).send({ status: "Service Unavailable", message: error.message });
        }
    }
}

export default cryptoController;