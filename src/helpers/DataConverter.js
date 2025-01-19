export function dataConverter(dataArray) {
    // Map the data to the required format
    return dataArray.map(item => {
        // Assuming mileage is at index 6 and price is at index 7
        const mileage = item[6];
        const price = item[7];

        // Return the new object with x and y
        return { x: mileage, y: price };
    });
}