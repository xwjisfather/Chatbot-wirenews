'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Client } from "@langchain/langgraph-sdk"
import { CharacterModel } from "@/components/r3f/gltfjsx/character"
import { ThreeController } from "@/components/r3f/components/three-controller"
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
  id?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_VENUS_URL
      const apiKey = process.env.NEXT_PUBLIC_API_TOKEN

      if (!apiUrl || !apiKey) {
        throw new Error("Chatbot API Key or URL Missing.")
      }

      const client = new Client({
        apiUrl: apiUrl,
        apiKey: apiKey,
        timeoutMs: 30000,
      })

      // 获取助手列表
      const assistants = await client.assistants.search({
        metadata: null,
        offset: 0,
        limit: 10,
      })

      // 使用第一个助手
      const agent = assistants[0]

      // 创建新的对话线程
      const thread = await client.threads.create()

      // 开始流式响应
      const streamResponse = client.runs.stream(
        thread["thread_id"],
        agent["assistant_id"],
        {
          input: { 
            messages: [{ role: "human", content: input.trim() }] 
          },
        }
      )

      // 处理流式响应
      for await (const chunk of streamResponse) {
        if (chunk.event === "values") {
          if (chunk.data.messages.length > 1 && chunk.data.messages[1].type === "ai") {
            const answer = chunk.data.messages[1].content
            
            setMessages(prev => {
              const newMessages = [...prev]
              const lastMessage = newMessages[newMessages.length - 1]
              
              if (lastMessage && lastMessage.role === 'assistant') {
                lastMessage.content = answer
              } else {
                newMessages.push({
                  role: 'assistant',
                  content: answer
                })
              }
              
              return [...newMessages]
            })
          }
        }
      }

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `错误: ${error instanceof Error ? error.message : '未知错误'}`
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen h-screen overflow-hidden bg-gradient-to-br from-[#AED2FD] to-[#4D3589]">
     {/* 返回主页按钮 - 使用 Link 组件 */}
     <Link 
                href="/"
                className="absolute top-6 left-6 px-4 py-2 
                         bg-gradient-to-r from-[#AED2FD] to-[#4D3589]
                         rounded-lg text-white font-semibold
                         hover:opacity-90 transition-all duration-300
                         flex items-center space-x-2
                         backdrop-blur-sm border border-[rgba(255,255,255,0.1)]"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                        clipRule="evenodd" 
                    />
                </svg>
                <span>返回主頁</span>
            </Link>
          
         {/* 虚拟人区域  */}
      <div className="absolute left-[18%] bottom-20 h-[80%] w-[300px] overflow-hidden ">
        <ThreeController
          character={<CharacterModel />}
          cameraDebug={false}
          stats={false}
        />
      </div>
      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col h-full">
        {/* 消息列表区域 */}
        <div className="flex-1 overflow-y-auto styled-scrollbar">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {/* 欢迎消息 */}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center my-12"
              >
                <h1 className="text-4xl font-marcellus text-glow mb-4">
                  智富匯AI助手
                </h1>
                <p className="text-[rgba(255,255,255,0.8)]">
                  您的專業金融咨詢夥伴
                </p>
              </motion.div>
            )}

            {/* 聊天消息 */}
            <div className="space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'glass-effect bg-opacity-20 text-white'
                        : 'glass-card text-white'
                    }`}
                  >
                    <p className="text-base font-noto leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* 加载动画 */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass-card rounded-2xl p-4">
                    <div className="flex space-x-2">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-[#AED2FD] rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* 输入区域 */}
        <div className="border-t border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.1)]">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="輸入您的問題..."
                className="w-full px-6 py-4 rounded-xl bg-[rgba(255,255,255,0.05)] 
                         border border-[rgba(255,255,255,0.1)] text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-[#6C22BD] transition-all duration-300
                         pr-24"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2
                         px-4 py-2 rounded-lg bg-gradient-to-r 
                         from-[#AED2FD] to-[#4D3589] text-white 
                         font-semibold hover:opacity-90 transition-all 
                         duration-300 disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                發送
              </button>
            </form>
            
            {/* 底部提示文字 */}
            <p className="text-center mt-3 text-sm text-[rgba(255,255,255,0.5)]">
              AI助手會盡力提供准確的信息，但建議您進行適當的驗證
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}