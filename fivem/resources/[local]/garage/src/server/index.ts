import { VehicleManager } from "../classes/vehicle-manager";

const vehicleManager = new VehicleManager();

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
      console.log(`Spawning car for player ${source} with plate ${plate}`);

      await vehicleManager.spawnVehicle(source, plate);
    } catch (e) {
      console.error(e);
    }
  },
  false
);
