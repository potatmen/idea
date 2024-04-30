import studentModel from "./../schemas/schema.js"
const cryptoController = {
    async getPrices(req, res) {
        try {
            //console.log(req.body);
            var ans = await studentModel.find();
            res.status(200).send({ status: "Success", message: ans });

        } catch (error) {
            res.status(503).send({ status: "Service Unavailable", message: error.message });
        }
    }
}

export default cryptoController;