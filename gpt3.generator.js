require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const { getpdfTotext } = require("./pdf.to.string")


const generator = async (file, company_name, company_address,
                        city, country, role, years_of_exp,
                        date, recipient_name, recipient_department,
                        recipient_email, recipient_phone_no) => {
    const result = await getpdfTotext(file);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);


// create the prompt with the function parameters
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Generate a cover letter for a backend web developer at Google, the resume is as follows: ${result}`,
        temperature: 0.5,
        max_tokens: 424,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    const coverLetter = response.data.choices[0].text
    return coverLetter;
}
module.exports = { generator }