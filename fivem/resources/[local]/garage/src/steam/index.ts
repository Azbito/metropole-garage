export function getSourceFromSteamID(steamID: string): number | null {
  for (let i = 0; i < GetNumPlayerIndices(); i++) {
    const source = parseInt(GetPlayerFromIndex(i));
    const identifiers = getPlayerIdentifiers(source);

    for (const id of identifiers) {
      if (id === `steam:${steamID}`) {
        return source;
      }
    }
  }

  return null;
}
