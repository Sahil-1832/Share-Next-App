import { NextResponse } from 'next/server'
import { render } from "@react-email/render";
import { EmailTemplate } from '../../_components/EmailTemplate'
import nodemailer from 'nodemailer'
import React from 'react';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const emailHtml = await render(React.createElement(EmailTemplate, { response: body }));
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: body.emailToSend,
            subject: `${body.userName} shared a file with you`,
            html: emailHtml,
        }
        await transporter.sendMail(mailOptions);

        return NextResponse.json({success:true,message:'Email sent successfully!'});
    }catch(error){
        console.error(error);
        return  NextResponse.json(
            {success:false,message:'Failed to send email'},
            {status:500}
        );
    }
}

export function GET(){
    return NextResponse.json({message:'This API endpoint only Supports POST requests.'},{status:405});
}