import { decodeBase64 } from "https://deno.land/std@0.205.0/encoding/base64.ts";

const key = decodeBase64(Deno.env.get("SESSION_JWT_SECRET")!);

export const SESSION_JWT_KEY = crypto.subtle.importKey(
  "raw",
  key,
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
