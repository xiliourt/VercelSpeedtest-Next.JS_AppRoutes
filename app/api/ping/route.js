export const runtime = "edge"

export async function GET(request) {
  return new Response('OK', { status: 200,
    headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, s-maxage=86400, max-age=0, must-revalidate' },
  });
}
