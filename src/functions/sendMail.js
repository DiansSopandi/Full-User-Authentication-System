import SendInBlue from 'sib-api-v3-sdk';
import { SENDBLUE_API, HOST_EMAIL } from '../constants';


// Inisiasi
const defaultClient = SendInBlue.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = SENDBLUE_API;

// Membuat Instance untuk mengirim Email

// const APIInstance = new SendInBlue.TransactionalEmailsApi();
// let EmailInstance = new SendInBlue.SendSmtpEmail();

// var apiInstance = new SendInBlue.EmailCampaignsApi();
// var emailCampaigns = new SendInBlue.CreateEmailCampaign();
var apiInstance = new SendInBlue.TransactionalEmailsApi();
var sendSmtpEmail = new SendInBlue.SendSmtpEmail();

// Fungsi Mengirim Email
let sendMail = async (msg, callback) => {
    // EmailInstance = {
    //     sender: {"name":"Dians","email":HOST_EMAIL },
    //     to: {"name":msg['name'],"email":msg['email']},
    //     // [
    //     //     { "email":  msg['email'] }
    //     //     // { "email": "alghazamumtaz@gmail.com"},
    //     //     // { "email": "backup.data.redmi7@gmail.com"}
    //     // ],
    //     subject: "Verify Account",
    //     textContent: html
    //     // textContent: "Please Verify Account.<br>Congratulations! You successfully sent this example campaign via the Sendinblue API."
    // }

    // EmailInstance='';
    // EmailInstance.sender = {"name":"Dians","email":HOST_EMAIL };
    // EmailInstance.to = {"name":msg['name'],"email":msg['email']};
    // EmailInstance.subject = 'Verify Account';
    // EmailInstance.sender = html;    

    // emailCampaigns.name = "Campaign sent via the API";
    // emailCampaigns.subject = "Verify Account";
    // // emailCampaigns.sender = {"name": msg['name'], "email":HOST_EMAIL};
    // emailCampaigns.sender = HOST_EMAIL;
    // emailCampaigns.type = "classic";
    // // # Content that will be sent\
    // htmlContent: 'Congratulations! You successfully sent this example campaign via the Sendinblue API.',
    // // # Select the recipients\
    // emailCampaigns.toField = msg['email'];
    // emailCampaigns.recipients = {"email": msg['email']}; //{listIds: [2, 7]},

    sendSmtpEmail = {
        sender:{email: HOST_EMAIL},
        to: [{
            email: msg['email'],
            name: msg['name']
        }],
        // templateId: 1,
        params: {
            name: 'John',
            surname: 'Doe'
        },
        subject: 'Authentication Registration',
        textContent: msg['html'],
        headers: {
            'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
        }
    };    
    // # Make the call to the client\
    await apiInstance.sendTransacEmail(sendSmtpEmail)
          .then(
            (data) =>  console.log(`API called successfully. Returned data: ${JSON.stringify(data)}`), 
            (error) => console.error(`API called fail: ${error}`)
    );

    // await apiInstance.createEmailCampaign(emailCampaigns)
    //       .then(
    //           (msg) =>  console.log(`API called successfully. Returned data:${msg}`), 
    //           (error) => console.error(`API called fail: ${error}`)
    //       );

        // await APIInstance.sendTransacEmail(EmailInstance).then(
        //     function (result) {
        //         callback(null,`API called successfully. Returned data: ${JSON.stringify(result)}`);
        //     },
        //     function (error) {
        //         callback(error, `API called and register fail ${null}`);
        //     });    
            
}

export default sendMail;
// module.exports = { sendEmail };