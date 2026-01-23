import { getFlightPlans } from "@/server-apis/flightPlans";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const queryParams = req.nextUrl.searchParams;
    const callSign = queryParams.get('callSign');
    const res = await getFlightPlans(callSign);
    if (res instanceof Error) {
        return NextResponse.json({ error: res.message }, { status: 500 })
    }
    return NextResponse.json(res)
}