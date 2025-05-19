import { VehicleManager } from "@/classes/vehicle-manager";
import { hexToRgb } from "@/utils/hex";
import "./ui";
import { activeVehicles } from "@/data/active-vehicles";

interface VehicleData {
  model: string;
  color: { primary: string; secondary: string };
  plate: string;
  damage: number;
  fuel: number;
  locked: boolean;
}

onNet("garage:spawnVehicle", async (vehicleData: VehicleData) => {
  const { model, color, plate, damage, fuel, locked } = vehicleData;

  const modelHash = GetHashKey(model);

  RequestModel(modelHash);
  let timeout = 0;
  while (!HasModelLoaded(modelHash) && timeout < 10000) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    timeout += 100;
  }

  if (!HasModelLoaded(modelHash)) {
    console.error(`Model ${model} not loaded`);
    return;
  }

  const playerPed = PlayerPedId();
  const pos = GetEntityCoords(playerPed, false);
  const heading = GetEntityHeading(playerPed);

  const spawnDistance = 2;
  const spawnX = pos[0] + spawnDistance * Math.cos(heading * (Math.PI / 180));
  const spawnY = pos[1] + spawnDistance * Math.sin(heading * (Math.PI / 180));
  const spawnZ = pos[2];

  const vehicle = CreateVehicle(
    modelHash,
    spawnX,
    spawnY,
    spawnZ,
    heading,
    true,
    false
  );

  if (vehicle && vehicle !== 0) {
    SetVehicleNumberPlateText(vehicle, plate);

    const primary = hexToRgb(color.primary);
    const secondary = hexToRgb(color.secondary);

    SetVehicleCustomPrimaryColour(vehicle, primary.r, primary.g, primary.b);
    SetVehicleCustomSecondaryColour(
      vehicle,
      secondary.r,
      secondary.g,
      secondary.b
    );
    SetVehicleBodyHealth(vehicle, 1000 - damage * 10);
    SetVehicleEngineHealth(vehicle, 1000 - damage * 10);
    SetVehicleFuelLevel(vehicle, fuel);
    SetVehicleDoorsLocked(vehicle, locked ? 2 : 1);

    SetPedIntoVehicle(playerPed, vehicle, -1);
    SetModelAsNoLongerNeeded(modelHash);
  } else {
    console.error("Failed to spawn vehicle");
  }
});

onNet("garage:despawnVehicle", (data: { plate: string }) => {
  try {
    if (!data?.plate || typeof data.plate !== "string") {
      throw new Error("Invalid plate.");
    }

    const searchPlate = data.plate.trim().toUpperCase();

    const vehicleManager = new VehicleManager(activeVehicles);
    const vehicles = vehicleManager.getAllVehicles();

    for (const vehicle of vehicles) {
      if (!DoesEntityExist(vehicle)) continue;

      const plate = GetVehicleNumberPlateText(vehicle).trim().toUpperCase();

      if (plate === searchPlate) {
        DeleteEntity(vehicle);
        return;
      }
    }
  } catch (err) {
    console.error("Failed while removing the vehicle:", err);
  }
});
