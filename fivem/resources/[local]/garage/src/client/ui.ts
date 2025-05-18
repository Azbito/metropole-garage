RegisterCommand(
  "car-manager",
  (source: number, args: string[]) => {
    const showUI = args[0] === "true";

    SetNuiFocus(showUI, showUI);
    SendNUIMessage({
      action: showUI ? "show" : "hide",
    });
  },
  false
);

RegisterNuiCallbackType("close");

on("__cfx_nui:close", (data: any, cb: (result: any) => void) => {
  SetNuiFocus(false, false);
  cb({});
});
