"use server"

import { headers } from "next/headers"
import type { ChatMessage } from "~/components/chat"

export async function sendMessage(input: string, history: ChatMessage[] = []) {
  const reqHeaders = await headers()
  const host = reqHeaders.get("host") ?? "localhost:3000"
  const protocol = host.includes("localhost") ? "http" : "https"
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, history }),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    console.error("API /api/chat error:", res.status, errorBody)
    throw new Error(errorBody.details ?? errorBody.error ?? `API error: ${res.status}`)
  }

  const data = await res.json()
  return data.text as string
}
