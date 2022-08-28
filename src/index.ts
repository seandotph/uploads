import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import express, { Request, Response } from 'express'
import config from './config'

const options = {
    endpoint: config.endpoint,
    signatureVersion: 'v4',
    region: config.region,
}

const client = new S3Client(options)

const app = express()

const uploadHandler = async (req: Request, res: Response) => {

    const { bucket, key } = req.params

    const putCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
    })

    const url = await getSignedUrl(client, putCommand)

    res.status(200).send({ url })

}

app.get('/:bucket/:key', uploadHandler)

app.listen(3005)