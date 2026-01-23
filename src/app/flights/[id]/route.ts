import { getFlightPlanDetails } from "@/server-apis/flightPlans"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const res = await getFlightPlanDetails(id)

    if (res instanceof Error) {
        return NextResponse.json({ error: res.message }, { status: 500 })
    }

    return NextResponse.json(res)
}