export async function fetchUrl(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  } = {}
): Promise<{ status: number; text: string }> {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: options.headers,
    body: options.body,
  });
  const text = await response.text();
  return { status: response.status, text };
}
