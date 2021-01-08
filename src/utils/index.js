export function defaultEquals(a, b) {
    return a === b;
}

export function equalsECG(a, b) {
    return Math.abs(a.time - b.time) < 5
}
