import { HTTP } from "@/classes/http";
import { VehicleManager } from "@/classes/vehicle-manager";
import { API_URL } from "@/config";
import { ICar } from "@/interfaces/car";
import { PayloadProps } from "@/interfaces/payload";
import { getSourceFromSteamID } from "@/steam";
import { HTTPHandlerProps } from ".";
import { activeVehicles } from "@/data/active-vehicles";

export async function spawnVehicle({ req, res }: HTTPHandlerProps) {
  let body = "";

  req.setDataHandler(async (data) => {
    body += data;

    try {
      const payload: PayloadProps = JSON.parse(body);
      const source = getSourceFromSteamID(payload.userId);

      if (!source) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.send(JSON.stringify({ success: false, message: "User not found" }));
        return;
      }

      const httpReq = new HTTP();

      const vehicleManager = new VehicleManager(activeVehicles);
      await vehicleManager.spawnVehicle({
        source,
        payload,
        getFunction: (plate: string): Promise<ICar | null> => {
          const urlString = `${API_URL}/cars/plate/${encodeURIComponent(
            plate
          )}`;
          return httpReq.get(urlString);
        },
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
