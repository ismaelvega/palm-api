import { NextResponse} from "next/server";

let interactions = [];

export async function POST(request) {
  try {
    const { data } = await request.json();
    console.log('body', data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error)
  }
  
}