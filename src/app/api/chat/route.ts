import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // 这里替换为你的机器人逻辑
    // 示例：简单的回复
    const response = `这是机器人的回复：${message}`

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    )
  }
}