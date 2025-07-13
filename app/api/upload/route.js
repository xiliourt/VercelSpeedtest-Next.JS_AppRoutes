export const runtime = 'edge';

export async function POST(request) {
    try {
        if (!request.body) {
            return new Response(JSON.stringify({ message: 'Request body is missing' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        const reader = request.body.getReader();
        while (true) {
            const { done } = await reader.read();
            if (done) {
                break; // The stream has been fully consumed.
            }
        }
    } catch (error) {
        console.error('Upload API (Edge) stream processing error:', error);
        return new Response(JSON.stringify({ message: 'Error processing upload data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ message: 'Upload received and processed.'}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function GET(request) {
    return new Response(`Method ${request.method} Not Allowed`, {
        status: 405,
        headers: { 'Allow': 'POST, OPTIONS' },
    });
}
