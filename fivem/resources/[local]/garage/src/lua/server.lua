RegisterNetEvent("requestSteamID")
AddEventHandler("requestSteamID", function()
    local src = source
    local steamIdRaw = GetPlayerIdentifier(src, 0)

    local steamIdHex = ""
    
    if steamIdRaw and steamIdRaw:sub(1, 6) == "steam:" then
        steamIdHex = steamIdRaw:gsub("steam:", "")
    end

    TriggerClientEvent("sendSteamIDToClient", src, steamIdHex)
end)
