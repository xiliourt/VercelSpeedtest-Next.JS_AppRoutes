export const runtime = "edge";

function generateRandomChunk(size) {
  const buffer = new Uint8Array(size);

  // Check if the Web Crypto API is available.
  // Vercel's Edge Runtime does not support it.
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(buffer);
  } else {
    for (let i = 0; i < size; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
  }
  return buffer;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // Default to 10MB if the size parameter is not provided.
  const requestedSize = parseInt(searchParams.get('size')) || (10 * 1024 * 1024); 
  const chunkSize = 64 * 1024; // 64KB chunks for streaming

  let bytesSent = 0;

  // Create a ReadableStream to send data in chunks.
  const stream = new ReadableStream({
    async pull(controller) {
      // If all bytes have been sent, close the stream.
      if (bytesSent >= requestedSize) {
        controller.close();
        return;
      }
      
      const bytesRemaining = requestedSize - bytesSent;
      const currentChunkSize = Math.min(chunkSize, bytesRemaining);

      try {
        // Generate the data chunk and enqueue it to be sent.
        const chunk = generateRandomChunk(currentChunkSize);
        controller.enqueue(chunk);
        bytesSent += currentChunkSize;
      } catch (error) {
        console.error("Error generating or enqueuing chunk:", error);
        controller.error(error); // Signal an error to the stream.
      }
    },
    cancel(reason) {
      console.log('Download stream cancelled by client.', reason);
    }
  });

  // Return the stream as the response.
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="download.dat"`,
      'Content-Length': requestedSize.toString(),
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
