const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'landen28@ethereal.email',
        pass: '7J9JemBRN3YxByQSs8'
    }
});


// API endpoint for sending emails
app.post('/send-email', (req, res) => {
    const formData = req.body;
    console.log(formData)
    // console.log(formData.Email);
    const mailOption = {
        from: "landen28@ethereal.email",
        to: formData.Email,
        subject: `Statement of Purpose for ${formData.Name}`,
        text: 
        `From
        ${formData.Name}
        123 Main Street
        City, State, Zip Code
        ${formData.Email}
        
        To
        Visa Officer
        High Commission of Canada
        City, State, Zip Code
      
        Subject: Statement of Purpose for studying in Canada

        Dear Sir/Madam,

        I would like to take this opportunity to introduce myself as ${formData.Name} & age of ${formData.Age}, a passionate
        individual with a strong desire to pursue higher education in Canada. I have recently
        completed my ${formData.selectedOption} in ${formData.Course} from ${formData.College} in ${formData.Country}.

        During my undergraduate studies, I developed a keen interest in ${formData.Course} and realized
        the immense potential it holds for personal and professional growth. I am particularly drawn
        to the interdisciplinary nature of the program, as it will provide me with a comprehensive
        understanding of all major concepts in ${formData.Course} and related subjects. This will equip
        me with the necessary knowledge and skills to excel in my future career.

        After thorough research and consideration, I have chosen to pursue my ${formData.CanadaCourse} program at ${formData.CanadaCollege} in Canada.
        The reputation and academic excellence of ${formData.CanadaCollege} make it an ideal fit for my educational goals. The faculty members are 
        highly experienced and skilled, and the facilities provided are top-notch. I believe that studying and collaborating with such esteemed 
        individuals will greatly enhance my academic experience and contribute to my overall development.

        In terms of language proficiency, I have achieved an overall score of ${(parseInt(formData.Reading) + parseInt(formData.Listening) + parseInt(formData.Writing) + parseInt(formData.Speaking))/4} in the IELTS
        examination, with individual scores of ${formData.Listening} in listening, ${formData.Reading} in reading, ${formData.Writing} in writing, and ${formData.Speaking} in
        speaking. This demonstrates my strong command of the English language, which will enable
        me to fully engage in my chosen program of study in Canada.
        
        In terms of finances, I have paid the first year's tuition fee of ${formData.TutionFee} and have also secured a
        Guaranteed Investment Certificate (GIC) of ${formData.GICFee} CAD to cover my living expenses.
        Additionally, my family is fully supportive of my education and will provide financial
        assistance as needed.

        I kindly request you to process my visa application at the earliest convenience. I am grateful
        for your time and consideration.

        Extra Information:
        
        Relevant Work Experience: ${formData.workExperience}
        Future Goals: ${formData.Goals}
        English Scores - Listening: ${formData.Listening}
        English Scores - Reading: ${formData.Reading}
        English Scores - Speaking: ${formData.Speaking}
        English Scores - Writing: ${formData.Writing}
    
        If you have any further questions or need assistance, please feel free to contact us.
        Best regards,
        Ayush Raja
        `,
    }

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ error: "Failed to send email" });
        } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ message: "Email sent successfully" });
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
