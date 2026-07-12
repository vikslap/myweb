"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    // 1. Removed 'data' entirely since it went unused, satisfying no-unused-vars
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "souveekpal@gmail.com", // Make sure this is your actual email!
      subject: `New Project Brief from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    // 2. Safely extract the unknown error message without using 'any'
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unknown internal server error occurred.";
    return { success: false, error: errorMessage };
  }
}
