import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'


export async function middleware(request: NextRequest) {
    const session = await auth()
    if (session && session?.user) {
        return NextResponse.redirect(new URL('/home', request.url))
    } else {
        return NextResponse.redirect(new URL("/", request.url))
    }
}

