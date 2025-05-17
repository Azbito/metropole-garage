import { VehicleManager } from "../classes/vehicle-manager";
import { getSourceFromSteamID } from "../steam";
import { PayloadProps } from "../types";

const vehicleManager = new VehicleManager();

SetHttpHandler(
  (
    req: {
      address: string;
      headers: Record<string, string>;
      method: string;
      path: string;
      setDataHandler(handler: (data: string) => void): void;
      setCancelHandler(handler: () => void): void;
    },
    res: {
      writeHead(
        code: number,
        headers?: Record<string, string | string[]>
      ): void;
      write(data: string): void;
      send(data?: string): void;
    }
  ) => {
    if (req.method !== "POST") {
      res.writeHead(404);
      res.send("Not Found");
      return;
    }

    let body = "";

    req.setDataHandler(async (data) => {
      body += data;

      try {
        const payload: PayloadProps = JSON.parse(body);
        const source = getSourceFromSteamID(payload.userId);

        if (!source) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.send(
            JSON.stringify({ success: false, message: "User not found" })
          );
          return;
        }

        await vehicleManager.spawnVehicle({
          source,
          payload,
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.send(JSON.stringify({ success: true }));
      } catch (e) {
        console.error("[HTTP] Erro:", e);
        res.writeHead(400);
        res.send("Bad Request");
      }
    });

    req.setCancelHandler(() => {
      console.log("[HTTP] Request cancelled by client");
    });
  }
);

RegisterCommand(
  "car",
  async (source: number, args: string[]) => {
    try {
      if (!args[0]) {
        emitNet("chat:addMessage", source, {
          args: ["^1System", "Usage: /car <plate>"],
        });
        return;
      }

      if (!IsPlayerAceAllowed(String(source), "command.car")) {
        emitNet("chat:addMessage", source, {
          args: ["^1System", "You have no permission to use this command."],
        });
        return;
      }

      const plate = args[0].toUpperCase();

      await vehicleManager.spawnVehicle({ source, plate });
    } catch (e) {
      console.error(e);
    }
  },
  false
);
