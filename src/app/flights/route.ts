import { getFlightPlans } from "@/server-apis/flightPlans";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const queryParams = req.nextUrl.searchParams;
    const callSign = queryParams.get('callSign');
    return NextResponse.json(await getFlightPlans(callSign))
}