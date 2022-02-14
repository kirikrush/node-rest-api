const nodemailer = require('nodemailer')
const ApiError = require('../exceptions/api-error')

class MailService {
    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.MAIL_USER,
                to: to,
                subject: 'activation',
                text: '',
                html:
                    `
                <h1>Открывай сука</h1>
                <a href="${link}">ссылка</a>
                `
            })
        } catch (e) {
            throw ApiError.BadRequest( 'Cant send message');
        }
    }

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
    }
}

module.exports = new MailService();