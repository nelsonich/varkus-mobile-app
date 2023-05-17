export function formatPrice(value, currency = "AMD") {
    return `${undefined === value ? 0 : value} ${currency}`;
}

export function textLimit(text, limit = 100) {
    return text.length > limit ? text.slice(0, limit).concat("...") : text;
}
