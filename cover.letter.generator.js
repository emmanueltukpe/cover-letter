const generator = require('./gpt3.generator');


const sendCoverLetter = async (req, res) => {
    const { company_name, role, recipient_name, recipient_department } = req.body;
    const coverLetter = await generator(req.files, file, company_name, role, recipient_name, recipient_department);
    const response = {
        status: "success",
        data: coverLetter
    }
    res.json(response);
}

module.exports = { sendCoverLetter }