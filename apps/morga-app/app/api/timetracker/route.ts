declare global {
  var timer: Date | null;
}

globalThis.timer = null;

function getDiff() {
  if (globalThis.timer) {
    return new Date().getTime() - globalThis.timer.getTime();
  }
  return 0;
}

export async function GET(request: Request) {
  return new Response(JSON.stringify({ time: getDiff() }), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request) {
  globalThis.timer = new Date();
  return new Response(JSON.stringify({ time: getDiff() }), {
    headers: { "content-type": "application/json" },
  });
}
