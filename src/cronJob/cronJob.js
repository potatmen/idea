import cron from "cron";
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config({ path: "./.env.development" });

const status = process.env.CRONJOB_STATUS.toLowerCase() == "active" ? true : false;
const cronJobExpression = process.env.CRONJOB_EXPRESSION;
async function setProposalExpiredCronJob(io) {
    new cron.CronJob(
        cronJobExpression,
        async () => {
            try {
                var changed = false;
                const coins = ["bitcoin", "ethereum", "litecoin", "monero", "xrp", "dogecoin", "dash"];

                for (const coin of coins) {
                    var config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `https://api.coincap.io/v2/assets/${coin}`,
                        headers: {}
                    };

                    await axios(config)
                        .then(function (resp) {
                            var data = {
                                price: resp.data.data.priceUsd,
                                volume: resp.data.data.volumeUsd24Hr,
                                change: resp.data.data.changePercent24Hr
                            }
                            var prevPrice = global.mapObject.get(coin);
                            if (!(prevPrice && prevPrice.price == data.price)) {
                                changed = true;
                                global.mapObject.set(coin, data);
                            }
                        });
                }

                if(changed) {
                    const serializedMap = [...global.mapObject.entries()];
                    console.log("Emitting Change Message to all clients!");
                    io.emit('change', serializedMap);
                }
            } catch (error) {
                console.log(` Error: ${error}`);
            } finally {
                console.log("CronJob: ended");
            }
        },
        null,
        status
    );
}
const startCronJob = (io) => {
    if (status) {
        console.log("Cronjob started");
        setProposalExpiredCronJob(io);
    }
};

export { startCronJob };