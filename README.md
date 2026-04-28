# Simple AI Chat

A minimal, modern AI chatbot interface built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Groq API**. Features a clean UI with markdown rendering, conversation history, and a responsive design.

## Features

- Real-time chat with AI using Groq's LLMs (Llama 3.3 70B)
- Markdown support for rich assistant responses
- Conversation history management
- New chat functionality
- Typing indicator while the AI is thinking
- Responsive UI with gradient background
- Server-side API route with error handling

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Button, Card, Input)
- **AI SDK:** Groq SDK
- **Icons:** Lucide React
- **Markdown:** React Markdown
- **Environment:** @t3-oss/env-nextjs

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: 20+)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- A [Groq](https://groq.com) account with an API key

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd simple-ai-chat
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

## Environment Variables

Create a `.env.local` file in the root of the project and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Getting a Groq API Key

1. Visit [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up or log in
3. Click **Create API Key**
4. Copy the key and paste it into your `.env.local` file

> ⚠️ **Important:** Do not add a trailing semicolon (`;`) to the `.env.local` file. This will cause Next.js to fail parsing the environment variable and result in a 500 error.

**Bad:**
```env
GROQ_API_KEY=gsk_xxx;
```

**Good:**
```env
GROQ_API_KEY=gsk_xxx
```

## Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will auto-reload when you make changes.

## Project Structure

```
simple-ai-chat/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # API route for chat completion
│   │   ├── actions.ts                # Server action to call API
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── chat.tsx                  # Main chat component
│   │   └── ui/                       # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   ├── env.js                        # Environment variable validation
│   └── styles/
│       └── globals.css               # Global styles
├── .env.local                         # Environment variables (not committed)
├── next.config.js                     # Next.js configuration
└── package.json
```

## API Endpoint

### `POST /api/chat`

Handles chat completions with the Groq API.

**Request Body:**
```json
{
  "input": "Hello, how are you?",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

**Success Response:**
```json
{
  "text": "I'm doing well, thank you! How can I help you today?"
}
```

**Error Response:**
```json
{
  "error": "Failed to generate response",
  "details": "Error message here"
}
```

## Troubleshooting

### 500 Internal Server Error on `/api/chat`

1. **Check `.env.local` syntax:** Ensure there is no trailing semicolon on the `GROQ_API_KEY` line.
2. **Restart the dev server:** Next.js reads `.env.local` at startup. If you change the file, restart with `Ctrl+C` and `pnpm dev`.
3. **Verify the API key:** Ensure your Groq API key is valid and has not expired.

### "Invalid environment variables" Error

This means the `GROQ_API_KEY` is missing or undefined. Check that:
- The `.env.local` file exists in the project root
- The variable name is exactly `GROQ_API_KEY`
- There are no extra characters or quotes causing parsing issues

## Build for Production

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## License

[MIT](LICENSE)
