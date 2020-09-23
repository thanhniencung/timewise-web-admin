export const parseDate = (d) => {
    var d = new Date(d);
    return d.toLocaleTimeString("en-US", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });
}