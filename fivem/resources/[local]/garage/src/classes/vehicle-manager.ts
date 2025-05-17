import fetch from "node-fetch";
import { PayloadProps } from "../types";
import { API_URL } from "../config";

export class VehicleManager {
  async spawnVehicle({
    source,
    plate,
    payload,
  }: {
    source?: number;
    plate?: string;
    payload?: PayloadProps;
  }) {
    try {
      const vehicle = plate ? await this.getByPlate(plate) : payload;

      if (!vehicle) {
        emitNet("chat:addMessage", source, {
          args: ["^1System", `Vehicle ${plate} not found.`],
        });
        return;
      }

      emitNet("garage:spawnVehicle", source, {
        model: vehicle.model,
        color: {
          primary: vehicle.primaryColor,
          secondary: vehicle.secondaryColor,
        },
        plate: vehicle.plate,
        damage: vehicle.damage,
        fuel: vehicle.fuel,
      });

      emitNet("chat:addMessage", source, {
        args: ["^2System", `Spawning vehicle ${vehicle.model} - ${plate}`],
      });
    } catch (error) {
      console.error("[ERROR]: spawnVehicle", error);
      emitNet("chat:addMessage", source, {
        args: ["^1System", "Error while searching for vehicle."],
      });
    }
  }

  private async getByPlate(plate: string) {
    try {
      const response = await fetch(`${API_URL}/cars/plate/${plate}`);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (!data) {
        return null;
      }

      return data;
    } catch (error) {
      console.error("[ERROR]:", error);
      return null;
    }
  }
}
