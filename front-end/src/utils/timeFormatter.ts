export function timeFormatter(time: number | undefined) {
    if (!time) return '0:00'
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`
    return formattedTime;
}