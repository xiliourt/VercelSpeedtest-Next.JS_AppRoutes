import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.method === 'OPTIONS') {
    const response = new Response(null, {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' },
    });
    return response;
  }
  return NextResponse.next();
}

export const config = { matcher: '/:api*' };
