export async function Log(stack, level, pkg, message) {
  try {
    await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
        timestamp: new Date().toISOString()
      }),
    });
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}