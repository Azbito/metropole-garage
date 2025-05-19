local pendingSteamIDCallback = nil

RegisterNUICallback("me", function(data, cb)
    pendingSteamIDCallback = cb
    TriggerServerEvent("requestSteamID")
end)

RegisterNetEvent("sendSteamIDToClient")
AddEventHandler("sendSteamIDToClient", function(steamId)
    if pendingSteamIDCallback then
        pendingSteamIDCallback(steamId)
        pendingSteamIDCallback = nil
    end
end)
