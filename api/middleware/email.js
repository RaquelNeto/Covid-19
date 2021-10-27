var elasticemail = require('elasticemail');


const email = (assunto, text, email_to) => {
    var client = elasticemail.createClient({
        username: 'COVID19 PAW',
        apiKey: process.env.EMAIL_API
    });

    var msg = {
        from: 'centrocovid19paw@gmail.com',
        from_name: 'Centro covid19',
        to: email_to,
        subject: assunto,
        body_text: text
    };

    client.mailer.send(msg, function(err, result) {
        if (err) {
            return console.error(err);
        }

        console.log(result);
    });
}

module.exports = email;