import useInput from "@/hooks/useInput"
import useMainPlayer from "@/hooks/useMainPlayer"
import { database } from "@/services/firebase"
import { onValue, orderByChild, push, query, ref, update } from "firebase/database"
import { keys, last } from "lodash-es"
import { Send } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

export interface Message {
  name: string
  message: string
  timestamp: number
}

export default function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Record<string, Message>>({})
  const bottomRef = useRef<HTMLDivElement>(null)
  const [username] = useMainPlayer((state) => [state.username])
  const bars = useMemo(() => new Audio("/bars.mp3"), [])
  const [startType, endType] = useInput((s) => [s.startType, s.endType])

  const sendMessage = async (message: string) => {
    if (!message) return

    await update(push(ref(database, `chats`)), {
      name: username,
      message,
      timestamp: Date.now(),
    }).catch((error) => {})
    setMessage("")
  }

  useEffect(() => {
    onValue(query(ref(database, "chats"), orderByChild("timestamp")), (snapshot) => {
      setMessages(snapshot.val())
      const senders = keys(snapshot.val())
      if (snapshot.val() && snapshot.val()[senders[senders.length - 1]].message.toLowerCase().includes("bars")) {
        bars.play()
      }
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="absolute bottom-6 left-6 w-[450px] h-[300px] bg-base-100 rounded-2xl p-4">
      <div className="relative w-full h-full">
        <div className="w-full flex flex-col overflow-auto h-[calc(100%-60px)] rounded-lg p-1">
          {messages &&
            Object.values(messages).map((message, index) => (
              <span ref={bottomRef} className="" key={index}>
                <span className="font-bold text-accent">{message.name}: </span> {message.message}
              </span>
            ))}
        </div>
        <div className="absolute bottom-0 flex gap-2 w-full">
          <input
            onFocus={startType}
            onBlur={endType}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-square btn-md btn-success text-lg hover:cursor-c-pointer active:cursor-c-pointer-clicked"
            onClick={() => sendMessage("🥑 BARS")}
          >
            🥑
          </button>
          <button
            className="btn btn-square btn-md btn-primary hover:cursor-c-pointer active:cursor-c-pointer-clicked"
            onClick={() => sendMessage(message)}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
