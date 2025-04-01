import { emailbroadcasttemplate } from "@/components/ui/emailbroadcasttemplate";
import { Resend } from "resend";
import { clerkClient } from "@clerk/clerk-sdk-node";
import React from "react";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

async function getAllUserEmails() {
  const allUsersResponse = await clerkClient.users.getUserList({ limit: 100 });

  const allUsers = allUsersResponse.data;
  return allUsers
    .map((user) => {
      const primaryEmail = user.emailAddresses?.find(
        (email) => email.id === user.primaryEmailAddressId
      );
      return primaryEmail?.emailAddress ?? null;
    })
    .filter((email) => email !== null);
}

export async function GET(): Promise<NextResponse> {
  return new NextResponse(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("Received POST request to /api/broadcast");
  try {
    const { message, subject }: { message: string; subject: string } =
      await request.json();
    console.log("Parsed Request:", { message, subject });

    if (!message || !subject) {
      console.error("Missing message or subject!");
      return new NextResponse(
        JSON.stringify({ error: "Message and subject are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const emails: string[] = await getAllUserEmails();
    console.log("Fetched emails:", emails);

    if (emails.length === 0) {
      console.error("No users found to send emails!");
      return new NextResponse(
        JSON.stringify({ error: "No users to send email to" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "alerts-noreply@nextweather.tech",
      to: emails,
      subject,
      react: React.createElement(emailbroadcasttemplate, {
        firstName: "User",
        message,
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return new NextResponse(JSON.stringify({ error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Email sent successfully!", data);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
