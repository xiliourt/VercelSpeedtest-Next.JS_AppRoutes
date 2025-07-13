export const runtime = 'edge';

export async function GET(request) {
	let servers = []; 
	
	// Try pulling servers from env
	const serversJsonEnv = process.env.SERVERS_JSON;
	if (serversJsonEnv && serversJsonEnv !== 'undefined') {
	try {
		const parsed = JSON.parse(serversJsonEnv);
		if (Array.isArray(parsed) && parsed.length > 0) { servers = parsed; }
	} catch (error) { console.error("Error parsing SERVERS_JSON:", error); }}

	// Fallback to either unlimited upload (Cloudflare) or 4MB (safe fallback)
	if (servers.length === 0) {
		servers = process.env.CF_PAGES_URL ? [{ name: 'Cloudflare (this deployment)', serverUrl: '' }]
		: servers = [{ name: 'This Deployment', serverUrl: '', maxUpload: '4194304' }];
	}

	return new Response(JSON.stringify(servers), { status: 200, 
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=86400, max-age=0, must-revalidate' },
  });
}
