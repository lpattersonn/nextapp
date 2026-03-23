import { NextRequest, NextResponse } from "next/server";
import { guestyFetch } from "@/lib/guesty";

/**
 * POST /api/guesty/contact
 * Body: {
 *   firstName, lastName, email, phone?,
 *   subject, propertyAddress?, listingLink?,
 *   helpType?, hearAboutUs?
 * }
 *
 * Creates an owner record in Guesty for host inquiries.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    propertyAddress,
    listingLink,
    helpType,
    hearAboutUs,
  } = body as {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject: string;
    propertyAddress?: string;
    listingLink?: string;
    helpType?: string;
    hearAboutUs?: string;
  };

  if (!firstName || !lastName || !email || !subject) {
    return NextResponse.json(
      { error: "firstName, lastName, email and subject are required" },
      { status: 400 }
    );
  }

  try {
    const noteLines = [
      `Subject: ${subject}`,
      helpType && `Service: ${helpType}`,
      propertyAddress && `Property: ${propertyAddress}`,
      listingLink && `Listing: ${listingLink}`,
      hearAboutUs && `Heard about us: ${hearAboutUs}`,
    ].filter(Boolean);

    const owner = await guestyFetch<{ _id: string }>("/owners", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        ...(phone ? { phone } : {}),
        notes: noteLines.join("\n"),
      }),
    });

    return NextResponse.json({ ownerId: owner._id });
  } catch (err) {
    console.error("[guesty/contact]", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
