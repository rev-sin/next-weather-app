import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { currentUser } from "@clerk/nextjs/server";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const user = await currentUser();
    console.log(user);
    try {
        const email = user?.primaryEmailAddress;
        if (!email) {
            return Response.json({ error: 'Email is required' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'alerts-noreply@nextweather.tech',
            to: [email.emailAddress],
            subject: 'Hello world',
            react: await EmailTemplate({ firstName: user.firstName || '' }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
