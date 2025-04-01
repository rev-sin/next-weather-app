import { GET, POST } from "./broadcastRoute";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";


jest.mock("@clerk/clerk-sdk-node", () => ({
  clerkClient: {
    users: {
      getUserList: jest.fn(),
    },
  },
}));

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn(),
    },
  })),
}));

const mockResend = new Resend(process.env.RESEND_API_KEY);

describe("broadcastRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return 405 Method Not Allowed", async () => {
      const response = await GET();
      expect(response.status).toBe(405);
      const json = await response.json();
      expect(json).toEqual({ error: "Method Not Allowed" });
    });
  });

  describe("POST", () => {
    it("should return 400 if message or subject is missing", async () => {
      const request = {
        json: jest.fn().mockResolvedValue({ message: "" }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(400);
      const json = await response.json();
      expect(json).toEqual({ error: "Message and subject are required" });
    });

    it("should return 400 if no users are found", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [],
      });

      const request = {
        json: jest
          .fn()
          .mockResolvedValue({
            message: "Test message",
            subject: "Test subject",
          }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(400);
      const json = await response.json();
      expect(json).toEqual({ error: "No users to send email to" });
    });

    it("should return 500 if email sending fails", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [
          {
            emailAddresses: [{ id: "1", emailAddress: "test@example.com" }],
            primaryEmailAddressId: "1",
          },
        ],
      });

      (mockResend.emails.send as jest.Mock).mockResolvedValue({
        error: "Failed to send email",
      });

      const request = {
        json: jest
          .fn()
          .mockResolvedValue({
            message: "Test message",
            subject: "Test subject",
          }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(500);
      const json = await response.json();
      expect(json).toEqual({ error: "Failed to send email" });
    });

    it("should return 200 if email is sent successfully", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [
          {
            emailAddresses: [{ id: "1", emailAddress: "test@example.com" }],
            primaryEmailAddressId: "1",
          },
        ],
      });

      (mockResend.emails.send as jest.Mock).mockResolvedValue({
        data: { id: "email-id" },
      });

      const request = {
        json: jest
          .fn()
          .mockResolvedValue({
            message: "Test message",
            subject: "Test subject",
          }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json).toEqual({ id: "email-id" });
    });
  });

  describe("getAllUserEmails", () => {
    it("should return a list of user emails", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [
          {
            emailAddresses: [{ id: "1", emailAddress: "test@example.com" }],
            primaryEmailAddressId: "1",
          },
        ],
      });

      const emails = await (
        await import("./broadcastRoute")
      ).getAllUserEmails();
      expect(emails).toEqual(["test@example.com"]);
    });

    it("should filter out users without primary email addresses", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [
          {
            emailAddresses: [{ id: "1", emailAddress: "test@example.com" }],
            primaryEmailAddressId: "2",
          },
        ],
      });

      const emails = await (
        await import("./broadcastRoute")
      ).getAllUserEmails();
      expect(emails).toEqual([]);
    });
  });
});
