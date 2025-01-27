import { PolynomialRegression } from 'ml-regression-polynomial';
export const graphHelper = (jsonData) => {
    const dataConverter = (dataArray) => {
        return dataArray.map(item => {
            const { mileage, price } = item;
            return { x: mileage, y: price };
        });
    };

    const convertedData = dataConverter(jsonData);
    const regression = new PolynomialRegression(convertedData.map(point => point.x), convertedData.map(point => point.y), 5);
    const xValues = convertedData.map(point => point.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const curvePoints = [];
    for (let x = minX; x <= maxX; x += (maxX - minX) / 500) {
        const y = regression.predict(x);
        curvePoints.push({ x, y });
    }
    return { convertedData, curvePoints };
}