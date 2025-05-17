import fetch from "node-fetch";

export class VehicleManager {
  async spawnVehicle(source: number, plate: string) {
    try {
      const vehicle = await this.getByPlate(plate);

      if (!vehicle) {
        emitNet("chat:addMessage", source, {
          args: ["^1Sistem", `Vehicle ${plate} not found.`],
        });
        return;
      }

      emitNet("garage:spawnVehicle", source, {
        model: vehicle.model,
        color: {
          primary: vehicle.primaryColor,
          secondary: vehicle.secondaryColor,
        },
        plate,
        damage: vehicle.damage,
        fuel: vehicle.fuel,
        locked: vehicle.locked,
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
      const response = await fetch(`http://localhost:3001/cars/spawn/${plate}`);

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
