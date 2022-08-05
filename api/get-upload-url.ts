import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch-commonjs'
import FormData from 'form-data'

export default async function (req: VercelRequest, res: VercelResponse) {
  const metadata = req.body.metadata
  console.log(metadata)

  const formData = new FormData()
  formData.append('requireSignedURLs', 'false')
  formData.append('metadata', JSON.stringify(metadata))

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: formData,
    }
  )

  const ret = await response.json()
  return res.json(ret)
}
