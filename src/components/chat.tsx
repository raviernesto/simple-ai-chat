"use client"

import { useState, useTransition } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { sendMessage } from "~/app/actions";
import ReactMarkdown from "react-markdown";
import { MessageSquarePlus } from "lucide-react";

export type ChatMessage = {
    role: "user" | "assistant",
    content: string
}

const Chat = () => {
    const [input, setInput] = useState("")
    const [history, setHistory] = useState<ChatMessage[]>([])
    const [isModelThinking, setTransition] = useTransition()

    const handleSend = async () => {
        if (!input.trim()) return
        const userMessage: ChatMessage = { role: "user", content: input }
        setHistory((prev) => [...prev, userMessage])
        setInput("")

        try {
            setTransition(async () => {
                const responseMessage = await sendMessage(input, [...history, userMessage])
                const chatMessage: ChatMessage = {
                    role: "assistant",
                    content: responseMessage ?? ""
                }

                setHistory((prev) => [...prev, chatMessage])
            })
        } catch (e) {

        }
    }

    const handleNewConversation = () => {
        setHistory([])
        setInput("")
    }

    const renderMessage = (text: string) => (
        <ReactMarkdown>
            {text}
        </ReactMarkdown>
    )

    return (
        <Card className="max-w-4xl mx-auto mt-10 shadow-lg">
            <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNewConversation}
                        disabled={history.length === 0 && !input.trim()}
                    >
                        <MessageSquarePlus />
                        New Chat
                    </Button>
                </div>
                <div className="flex flex-col gap-2 h-96 overflow-y-auto bg-muted rounded p-3">
                    {history.length === 0 && (
                        <span className="text-muted-foreground text-sm">Start the conversation...</span>
                    )}
                    {history.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg max-w-xs bubble-message ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground"
                                    }`}
                            >
                                {renderMessage(msg.content)}
                            </div>
                        </div>
                    ))}
                    {isModelThinking && (
                        <div className="flex justify-start">
                            <div className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground typing-indicator">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                            </div>
                        </div>
                    )}
                </div>
                <form
                    className="flex gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSend()
                    }}>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isModelThinking}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isModelThinking || !input.trim()}>
                        {isModelThinking ? "Thinking..." : "Send"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default Chat;