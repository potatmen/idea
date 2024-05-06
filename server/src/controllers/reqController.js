import studentModel from "../schemas/schema.js"
const reqController = {
    async getPrices(req, res) {
        try {
            //console.log(req.body);
            var ans = await studentModel.find();
            res.status(200).send({ status: "Success", message: ans });
            console.log("Req recieved and sent back!");

        } catch (error) {
            res.status(503).send({ status: "Service Unavailable", message: error.message });
        }
    }
}

export default reqController;