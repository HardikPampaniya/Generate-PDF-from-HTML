const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require("dotenv").config();

const convertAndSend = async (req, res) => {
  const { htmlCode, recipientEmail } = req.body;

  console.log(req.body);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlCode);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "hpamaniya.netclues@gmail.com",
        pass: "xfbc rohf vxhx pmhn"
      }
    });

    const mailOptions = {
      from: "hpamaniya.netclues@gmail.com",
      to: recipientEmail,
      subject: 'Converted PDF from HTML',
      text: 'Please find attached PDF.',
      attachments: [{ filename: 'converted.pdf', content: pdfBuffer }]
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).send('PDF generated and sent successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to generate PDF or send email');
  }
};

module.exports = convertAndSend;
