import * as djwt from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { SESSION_JWT_KEY } from "../_shared/SESSION_JWT_KEY.ts";
import { encodeBase64 } from "https://deno.land/std@0.205.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  console.log(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const input = await req.json();

  console.log(input);
  if (!input.os || !input.platform)
    return new Response(null, { headers: corsHeaders, status: 400 });

  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  const nonce = encodeBase64(buffer);

  const token = await djwt.create(
    { alg: "HS512", typ: "JWT" },
    { os: input.os, plt: input.platform, non: nonce },
    await SESSION_JWT_KEY,
  );

  return new Response(JSON.stringify({ token }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
