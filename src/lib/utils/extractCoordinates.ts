export default function extractCoordinates(jsonString: string) {
    try {
        // Parse the string into a JSON object
        const jsonObject = JSON.parse(jsonString);

        // Ensure the object is of the correct structure
        if (jsonObject.type === 'Point' && Array.isArray(jsonObject.coordinates) && jsonObject.coordinates.length === 2) {
            const [lng, lat] = jsonObject.coordinates;
            return { lat, lng };
        } else {
            throw new Error('Invalid JSON structure');
        }
    } catch (error) {
        console.error('Error parsing JSON string', error);
        return { lat: 0, lng: 0 }; // Default coordinates if parsing fails
    }
}