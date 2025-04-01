import { GET, POST } from "./broadcastRoute";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Resend } from "resend";
import React from "react";
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

jest.mock("react", () => ({
  createElement: jest.fn(),
}));

describe("route.ts", () => {
  const mockResend = new Resend("mock-api-key");

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return 405 Method Not Allowed", async () => {
      const response = await GET();
      expect(response.status).toBe(405);
      expect(await response.json()).toEqual({ error: "Method Not Allowed" });
    });
  });

  describe("POST", () => {
    it("should return 400 if message or subject is missing", async () => {
      const request = {
        json: jest.fn().mockResolvedValue({ message: "" }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({
        error: "Message and subject are required",
      });
    });

    it("should return 400 if no users are found", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [],
      });

      const request = {
        json: jest.fn().mockResolvedValue({ message: "Test", subject: "Test" }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({
        error: "No users to send email to",
      });
    });

    it("should return 500 if email sending fails", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [
          {
            emailAddresses: [
              { id: "primary", emailAddress: "user@example.com" },
            ],
            primaryEmailAddressId: "primary",
          },
        ],
      });

      (mockResend.emails.send as jest.Mock).mockResolvedValue({
        error: "Email sending failed",
      });

      const request = {
        json: jest.fn().mockResolvedValue({ message: "Test", subject: "Test" }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({
        error: "Email sending failed",
      });
    });

    it("should return 200 if email is sent successfully", async () => {
      (clerkClient.users.getUserList as jest.Mock).mockResolvedValue({
        data: [
          {
            emailAddresses: [
              { id: "primary", emailAddress: "user@example.com" },
            ],
            primaryEmailAddressId: "primary",
          },
        ],
      });

      (mockResend.emails.send as jest.Mock).mockResolvedValue({
        data: { id: "email-id" },
      });

      const request = {
        json: jest.fn().mockResolvedValue({ message: "Test", subject: "Test" }),
      } as unknown as NextRequest;

      const response = await POST(request);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ id: "email-id" });
    });
  });
});
