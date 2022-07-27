export const PI = 3.14159;
export const TWOPI = 2 * PI;

export function DegreesToRadians(deg) {
    return deg / 360 * TWOPI;
}

export function checkCollision(x1, y1, x2, y2) {
    const d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d < 5;
}

export function removeValuesFromArray(array, values) {
    for (let i = 0; i < values.length; i++) {
        const valueIndex = array.indexOf(values[i]);
        if (valueIndex > -1) {
            array.splice(valueIndex, 1);
        }
    }
}