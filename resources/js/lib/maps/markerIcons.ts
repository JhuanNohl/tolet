const LEAF_PATHS = [
    'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z',
    'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
];

const FONT_FAMILY =
    'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';

function pinSvg(number: string, color: string): string {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 68 88">
            <path d="M34 0C15.222 0 0 15.222 0 34c0 24 34 54 34 54s34-30 34-54C68 15.222 52.778 0 34 0z"
                fill="${color}" stroke="white" stroke-width="3" />
            <text x="34" y="35" text-anchor="middle" dominant-baseline="central"
                fill="white" font-family="${FONT_FAMILY}" font-size="26" font-weight="700">${number}</text>
        </svg>`;
}

function servicePointSvg(color: string): string {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="${color}" stroke="white" stroke-width="6" />
            <g transform="translate(16 16)" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <path d="${LEAF_PATHS[0]}" />
                <path d="${LEAF_PATHS[1]}" />
            </g>
        </svg>`;
}

function avatarSvg(color: string, initials: string, active: boolean): string {
    const dot = active
        ? '<circle cx="64" cy="64" r="12" fill="#22c55e" stroke="white" stroke-width="4" />'
        : '';

    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="${color}" stroke="white" stroke-width="5" />
            <text x="40" y="41" text-anchor="middle" dominant-baseline="central"
                fill="white" font-family="${FONT_FAMILY}" font-size="24" font-weight="700">${initials}</text>
            ${dot}
        </svg>`;
}

function elementFromSvg(svg: string): HTMLDivElement {
    const element = document.createElement('div');
    element.innerHTML = svg.trim();

    return element;
}

export function pinMarkerElement(
    number: string,
    color: string,
): HTMLDivElement {
    return elementFromSvg(pinSvg(number, color));
}

export function servicePointMarkerElement(color: string): HTMLDivElement {
    return elementFromSvg(servicePointSvg(color));
}

export function avatarMarkerElement(
    color: string,
    initials: string,
    active: boolean,
): HTMLDivElement {
    return elementFromSvg(avatarSvg(color, initials, active));
}
