import type { HttpHandler } from "msw";
import { http, HttpResponse } from "msw";

export const handlers: HttpHandler[] = [
  // NOTE we don't ever mock them in stories.
  http.get("/health", () => {
    return HttpResponse.json({ health: "ok" });
  }),
];
