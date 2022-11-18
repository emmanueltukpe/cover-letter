const generator = require('./gpt3.generator');


const sendCoverLetter = async (req, res) => {
    const { company_name, company_address,
        city, country, role, years_of_exp,
        date, recipient_name, recipient_department,
        recipient_email, recipient_phone_no } = req.body;
    const coverLetter = await generator(req.files, company_name, company_address,
        city, country, role, years_of_exp,
        date, recipient_name, recipient_department,
        recipient_email, recipient_phone_no);
    const response = {
        status: "success",
        data: coverLetter
    }
    res.json(response);
}

module.exports = { sendCoverLetter }