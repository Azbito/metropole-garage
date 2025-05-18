import * as http from "http";
import * as https from "https";
import { URL } from "url";

export class HTTP {
  constructor() {}

  public get(urlString: string): Promise<any | null> {
    return new Promise((resolve) => {
      try {
        const url = new URL(urlString);
        const lib = url.protocol === "https:" ? https : http;
        lib
          .get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
              data += chunk;
            });

            res.on("end", () => {
              if (
                res.statusCode &&
                res.statusCode >= 200 &&
                res.statusCode < 300
              ) {
                try {
                  const json = JSON.parse(data);
                  resolve(json);
                } catch (e) {
                  console.error("[PARSE ERROR]", e);
                  resolve(null);
                }
              } else {
                console.error(`[HTTP ERROR] Status: ${res.statusCode}`);
                resolve(null);
              }
            });
          })
          .on("error", (err) => {
            console.error("[HTTP REQUEST ERROR]", err);
            resolve(null);
          });
      } catch (e) {
        console.error("[URL PARSE ERROR]", e);
        resolve(null);
      }
    });
  }
}
