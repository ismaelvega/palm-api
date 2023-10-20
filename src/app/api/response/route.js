import { NextResponse } from "next/server";

export async function POST(request) {
  const { interactions } = await request.json();
  console.log(interactions);

  const { DiscussServiceClient } = require("@google-ai/generativelanguage");
  const { GoogleAuth } = require("google-auth-library");

  const MODEL_NAME = "models/chat-bison-001";
  const API_KEY = process.env.GOOGLE_AI_API_KEY;

  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
  });

  const res = await client.generateMessage({
    model: MODEL_NAME,
    context:
      "Write the responses in order to be displayed in formatted markdown. The library used is called Marked.",
    prompt: {
      messages: interactions,
    },
  });

  const data = res[0].candidates[0].content || null;
  console.log(data);

  return NextResponse.json({
    data: [
      ...interactions,
      {
        content: data,
      },
    ],
  });
}
