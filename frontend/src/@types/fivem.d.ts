export {};

declare global {
    interface Window {
        resourceName?: string;
        GetParentResourceName?: () => string;
    }

    function GetPlayerServerId(playerId: number): number;
    function PlayerId(): number;
}
