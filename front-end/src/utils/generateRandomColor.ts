export function generateRandomColor():string{
    const colorHexDecimal = Math.floor(Math.random() * 0xffffff).toString(16)
    const colorHexDecimalFormatted = `#${colorHexDecimal}`
    return colorHexDecimalFormatted
}