import { NextResponse } from "next/server";

import postgres, { Sql } from "postgres";
import { bodyToJson } from "../route";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

export async function GET(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const users = await sql`SELECT * FROM client`;

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("CLIENT_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  console.log(req);
  try {
    if (!params.clientId) {
      throw new Error("Client ID not provided");
    }

    const body = await bodyToJson(req);
    console.log("Parsed Body:", body);

    const { name, address, email, phone } = body;

    await sql`
      UPDATE client
      SET
        name = ${name},
        address = ${address},
        email = ${email},
        phone = ${phone}
      WHERE id = ${params.clientId}
    `;

    return new NextResponse("Client updated successfully", { status: 200 });
  } catch (error) {
    console.error("CLIENT_UPDATED", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    if (!params.clientId) {
      throw new Error("Client ID not provided");
    }

    await sql`DELETE FROM client WHERE id = ${params.clientId}`;

    return new NextResponse("Client deleted successfully", { status: 200 });
  } catch (error) {
    console.error("CLIENT_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
