export const format = {
    initialUpperCase: (value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
    toFahrenheit: (value: number) => ( ( value * (9/5) ) + 32 ),
}
