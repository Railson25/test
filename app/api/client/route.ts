import { NextResponse } from "next/server";
import postgres, { Sql } from "postgres";

interface ClientData {
  name: string;
  address: string;
}

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

export async function POST(req: Request, res: Response) {
  try {
    const body = (await bodyToJson(req)) as ClientData;

    const { name, address } = body;

    await sql`INSERT INTO client (name, address, created_at, updated_at) VALUES (${name}, ${address}, now(), now())`;

    return new NextResponse("Client created successfully", { status: 200 });
  } catch (error) {
    console.log("CLIENT_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

async function bodyToJson(req: Request) {
  //
  const reader = req.body!.getReader();
  const decoder = new TextDecoder();

  let result = new Uint8Array();

  const { value, done } = await reader
    .read()
    .then(function processText({ done, value }): any {
      if (done) {
        return {
          value: u8ArrayConcat(result, value ?? new Uint8Array()),
          done,
        };
      }
      result = u8ArrayConcat(result, value);

      return reader.read().then(processText);
    });

  if (!done) {
    throw new Error("Body is missing");
  }

  const response = decoder.decode(value, { stream: true });

  return JSON.parse(response);
}

function u8ArrayConcat(a1: Uint8Array, a2: Uint8Array): Uint8Array {
  var mergedArray = new Uint8Array(a1.length + a2.length);
  mergedArray.set(a1);
  mergedArray.set(a2, a1.length);
  return mergedArray;
}

export async function GET(req: Request, res: Response) {
  try {
    const users = await sql`SELECT * FROM client`;

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("CLIENT_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
