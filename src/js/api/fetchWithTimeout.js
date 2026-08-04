const DEFAULT_TIMEOUT_MS = 10000;

export async function fetchWithTimeout(url, { signal, timeout = DEFAULT_TIMEOUT_MS } = {}) {
  const requestController = new AbortController();
  let timedOut = false;

  const abortRequest = () => requestController.abort(signal?.reason);

  if (signal?.aborted) {
    abortRequest();
  } else {
    signal?.addEventListener("abort", abortRequest, { once: true });
  }

  const timeoutId = setTimeout(() => {
    timedOut = true;
    requestController.abort();
  }, timeout);

  try {
    return await fetch(url, { signal: requestController.signal });
  } catch (error) {
    if (timedOut) {
      throw new Error("The book service took too long to respond.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortRequest);
  }
}
