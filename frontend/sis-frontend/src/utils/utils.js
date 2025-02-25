export function dateFormatter(passedDate) {

    const dateTimeString = passedDate;
    const date = new Date(dateTimeString);
    
    // Format the date using toLocaleString() or other methods
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return formattedDate;
}

export function checkIfMinQuantityBlank(minQuantity) {
    if (minQuantity == '') {
        return 0;
    }

    return minQuantity;
}