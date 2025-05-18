import { ICar } from "../interfaces/car";
import { PayloadProps } from "../interfaces/payload";

export class VehicleManager {
  private activeVehicles: Map<string, number> = new Map();
  async spawnVehicle({
    source,
    plate,
    payload,
    getFunction,
  }: {
    source?: number;
    plate?: string;
    payload?: PayloadProps | null;
    getFunction: (plate: string) => Promise<ICar | null>;
  }): Promise<void> {
    try {
      const vehicle = plate ? await getFunction(plate) : payload;

      if (!vehicle) {
        emitNet("chat:addMessage", source, {
          args: ["^1System", `Vehicle ${plate} not found.`],
        });
        return;
      }

      const existingSource = this.activeVehicles.get(vehicle.plate);
      if (existingSource !== undefined) {
        emitNet("garage:despawnVehicle", existingSource, {
          plate: vehicle.plate,
        });

        emitNet("chat:addMessage", source, {
          args: [
            "^3System",
            `Despawning existing vehicle with plate ${vehicle.plate}`,
          ],
        });
      }

      this.activeVehicles.set(vehicle.plate, source ?? 0);

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
        args: [
          "^2System",
          `Spawning vehicle ${vehicle.model} - ${vehicle.plate}`,
        ],
      });
    } catch (error) {
      console.error("[ERROR]: spawnVehicle", error);
      emitNet("chat:addMessage", source, {
        args: ["^1System", "Error while searching for vehicle."],
      });
    }
  }

  public getAllVehicles(): number[] {
    const vehicles: number[] = [];

    const [handle, vehicle] = (FindFirstVehicle as any)();

    let success = vehicle !== 0;

    if (success) {
      vehicles.push(vehicle);
    }

    while (true) {
      const [hasNext, nextVehicle] = (FindNextVehicle as any)(handle);
      if (!hasNext) break;
      vehicles.push(nextVehicle);
    }

    EndFindVehicle(handle);
    return vehicles;
  }
}
