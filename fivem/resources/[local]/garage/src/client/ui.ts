SetNuiFocus(false, false);

RegisterNuiCallbackType("close");

RegisterCommand(
  "car-manager",
  () => {
    SetNuiFocus(true, true);
    SendNUIMessage({
      action: "show",
    });
  },
  false
);

on("__cfx_nui:close", (_data: any, cb: (result: any) => void) => {
  SetNuiFocus(false, false);
  SendNUIMessage({
    action: "hide",
  });
  cb({});
});
