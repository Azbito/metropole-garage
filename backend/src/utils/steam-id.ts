export function fiveMIDToSteamID64(fiveMID: string): string {
    const id64 = BigInt('0x' + fiveMID).toString(10);
    return id64;
}
