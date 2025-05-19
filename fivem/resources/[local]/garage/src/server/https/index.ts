import { spawnVehicle } from "./spawn-vehicle";

export interface HTTPReq {
  address: string;
  headers: Record<string, string>;
  method: string;
  path: string;
  setDataHandler(handler: (data: string) => void): void;
  setCancelHandler(handler: () => void): void;
}

export interface HTTPRes {
  writeHead(code: number, headers?: Record<string, string | string[]>): void;
  write(data: string): void;
  send(data?: string): void;
}

export interface HTTPHandlerProps {
  req: HTTPReq;
  res: HTTPRes;
}

SetHttpHandler((req: HTTPReq, res: HTTPRes) => {
  const path = req.path?.replace(/^\/+/, "") ?? "";
  const method = req.method ?? "";

  if (method === "POST" && path === "spawn") {
    return spawnVehicle({ req, res });
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.send(JSON.stringify({ success: false, message: "Not Found" }));
});
