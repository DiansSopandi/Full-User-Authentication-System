
const SendInBlue = require('sib-api-v3-sdk');

// Inisiasi
const defaultClient = SendInBlue.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = "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";

// Membuat Instance untuk mengirim Email
// const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// const apiInstance = new SendInBlue.EmailCampaignsApi();
// const emailCampaigns = new SendInBlue.CreateEmailCampaign();

const APIInstance = new SendInBlue.TransactionalEmailsApi();
const EmailInstance = new SendInBlue.SendSmtpEmail();

// Fungsi Mengirim Email
const sendEmail = (data, callback) => {
    // EmailInstance.subject = data.subject;
    // EmailInstance.sender = data.sender;
    // EmailInstance.to = data.to;
    // EmailInstance.htmlContent = data.htmlContent;

    EmailInstance = {
        sender: { "email": "dian.sopandi@gmail.com" },
        to: [
            { "email": "alghazamumtaz@gmail.com"},
            { "email": "backup.data.redmi7@gmail.com"}
        ],
        subject: "Test Email with SendinBlue API",
        textContent: "Congratulations! You successfully sent this example campaign via the Sendinblue API."
    }

  APIInstance.sendTransacEmail(EmailInstance).then(
    function (result) {
      callback(null,`API called successfully. Returned data: ${JSON.stringify(result)}`);
    },
    function (error) {
      callback(error, `API called fail ${null}`);
    }
  );

}

export default sendEmail;
// module.exports = { sendEmail };