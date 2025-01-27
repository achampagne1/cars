import { downloadData } from '@aws-amplify/storage';

export const getFileFromS3 = async (fileName) => {
    try {
        const downloadResult = await downloadData({ path: `${fileName}.json` }).result;
        const data = await downloadResult.body.text();
        console.log(data);
        const jsonData = JSON.parse(data);
        return jsonData;

    } catch (error) {
        console.error("Error fetching data from S3:", error);
        return null;
    }
}