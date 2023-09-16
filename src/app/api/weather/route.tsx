import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const latitude = searchParams.get('lat');
    const longitude = searchParams.get('lon');
    const API_key = 'b2a39937953907355bb1f1c2f1965d97'
    
    let url = "";
    if(address) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${API_key}`
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
    }

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json({ data });
}
