import { NextResponse } from "next/server";

import postgres, { Sql } from "postgres";
import { u8ArrayConcat } from "../route";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

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
