import { NextResponse } from "next/server"

export async function GET() {
    const res = {
        status: 'ok',
        timestamp: new Date().toISOString()
    }

    return NextResponse.json(res)
}  