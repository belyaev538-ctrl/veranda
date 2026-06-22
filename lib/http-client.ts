import {
  ProxyAgent,
  fetch as undiciFetch,
  type RequestInit as UndiciRequestInit,
} from "undici";

const proxyUrl =
  process.env.TELEGRAM_HTTP_PROXY?.trim() ||
  process.env.HTTP_PROXY?.trim() ||
  process.env.HTTPS_PROXY?.trim();

const proxyDispatcher = proxyUrl ? new ProxyAgent(proxyUrl) : undefined;

export async function httpFetch(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  if (!proxyDispatcher) {
    return fetch(input, init);
  }

  const undiciInit: UndiciRequestInit = {
    method: init?.method,
    headers: init?.headers as UndiciRequestInit["headers"],
    body: init?.body as UndiciRequestInit["body"],
    dispatcher: proxyDispatcher,
  };

  const response = await undiciFetch(input, undiciInit);

  return response as unknown as Response;
}
