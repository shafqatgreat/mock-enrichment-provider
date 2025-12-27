// src/index.ts
export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    console.log("Inside Provider:");
    // Consume body so fetch pipeline completes correctly
    // await request.json().catch(() => ({}));
    // Read incoming client data
    const clientData = await request.json().catch(() => ({}));
    console.log("Received data from gateway:", clientData);

    return new Response(
      JSON.stringify({
        mobile: "+923001234567",
        confidence: 0.88,
        request_id: crypto.randomUUID(),
        receivedClientData: clientData, // Echo back client data
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  }
};
