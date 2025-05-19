import { HTTP } from "@/classes/http";
import { VehicleManager } from "@/classes/vehicle-manager";
import { API_URL } from "@/config";
import { activeVehicles } from "@/data/active-vehicles";
import { ICar } from "@/interfaces/car";

const vehicleManager = new VehicleManager(activeVehicles);

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

      const httpReq = new HTTP();

      await vehicleManager.spawnVehicle({
        source,
        plate,
        getFunction: (plate: string): Promise<ICar | null> => {
          const urlString = `${API_URL}/cars/plate/${encodeURIComponent(
            plate
          )}`;
          return httpReq.get(urlString);
        },
      });
    } catch (e) {
      console.error(e);
    }
  },
  false
);
