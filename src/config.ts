
const config = {
    endpoint: process.env.OBJECT_STORAGE_URL,
    region: process.env.REGION || 'auto',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
}

export default config