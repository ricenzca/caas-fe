import { NextResponse } from "next/server"

export async function GET() {
    const body = {
        status: 'ok',
        timestamp: new Date().toISOString()
    }
    const options = {
        status: 200
    }
    return NextResponse.json(body, options)
}  