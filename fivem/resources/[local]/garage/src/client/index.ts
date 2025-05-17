import { hexToRgb } from "../utils/hex";

onNet(
  "garage:spawnVehicle",
  (vehicleData: {
    model: string;
    color: { primary: string; secondary: string };
    plate: string;
    damage: number;
    fuel: number;
    locked: boolean;
  }) => {
    const { model, color, plate, damage, fuel, locked } = vehicleData;

    const spawnVehicle = async () => {
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

      const vehicle = CreateVehicle(
        modelHash,
        pos[0] + 2,
        pos[1],
        pos[2],
        GetEntityHeading(playerPed),
        true,
        false
      );

      if (vehicle) {
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
    };

    spawnVehicle();
  }
);
