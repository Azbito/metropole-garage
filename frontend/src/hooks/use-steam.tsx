import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { authenticate } from '@/services/steam/auth';

type SteamUser = {
    avatar: string;
    steam_id: string;
    name: string;
};

export function useSteam(): {
    steamId: string | null;
    isReady: boolean;
    user: SteamUser | null;
} {
    const [steamId, setSteamId] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState<SteamUser | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const claimedId = new URLSearchParams(window.location.search).get(
            'openid.claimed_id'
        );
        const extractedSteamId = extractSteamIdFromClaimedId(claimedId);

        if (extractedSteamId) {
            Cookies.set('steamId', extractedSteamId, { expires: 7 });
            setSteamId(extractedSteamId);
            clearUrlQuery();
            handleAuthentication();
        } else {
            const existingId = Cookies.get('steamId');
            if (existingId) {
                setSteamId(existingId);
                handleAuthentication();
            } else {
                redirectToSteamLogin();
            }
        }
    }, []);

    async function handleAuthentication(): Promise<void> {
        try {
            const res = await authenticate();

            if (res) {
                setUser(res);
            }
        } catch (error) {
            console.error('Authentication failed:', error);
        } finally {
            setIsReady(true);
        }
    }

    function extractSteamIdFromClaimedId(
        claimedId: string | null
    ): string | null {
        const match = claimedId?.match(/\/(\d+)$/);
        const steamID64 = match?.[1];

        try {
            return steamID64 ? BigInt(steamID64).toString(16) : null;
        } catch {
            return null;
        }
    }

    function clearUrlQuery(): void {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, document.title, url.toString());
    }

    function redirectToSteamLogin(): void {
        const base = window.location.origin;
        const steamLoginUrl =
            `https://steamcommunity.com/openid/login?` +
            `openid.ns=http://specs.openid.net/auth/2.0&` +
            `openid.mode=checkid_setup&` +
            `openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&` +
            `openid.identity=http://specs.openid.net/auth/2.0/identifier_select&` +
            `openid.return_to=${base}/&` +
            `openid.realm=${base}/`;

        window.location.href = steamLoginUrl;
    }

    return { steamId, isReady, user };
}
