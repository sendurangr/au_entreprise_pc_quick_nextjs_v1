import nodemailer from 'nodemailer';

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com", // Replace with your AWS SES SMTP endpoint
    port: 587, // Use port 587 or 465
    secure: false, // true for 465, false for other ports
    auth: {
        user: "AKIAVL4OPEQR2IPLMD6D",
        pass: "BL8Ee/Z0esD46sjruIs4OO7HMtNO0jsdhhMvWl7EhZiT",
    },
});


export async function POST(req: Request) {

    const body = await req.json() as {
        name: string;
        email: string;
        message: string;
    };

    const mailOptions = {
        from: "senduran40@gmail.com",
        to: "senduran40@gmail.com",
        subject: "Test Email",
        html: `
        <html lang="en">
        <head>
            <style>
                table {
                    font-family: Arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }

                th {
                    background-color: #f2f2f2;
                }

                th,
                td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>hi</h1>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </body>
        </html>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        return Response.json({
            status: 'success',
        }, {
            status: 200,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({
            status: 'error',
        }, {
            status: 500,
        });
    }


}
