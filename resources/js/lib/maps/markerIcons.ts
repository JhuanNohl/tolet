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
