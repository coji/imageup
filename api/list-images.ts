import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch-commonjs'

export default async function (req: VercelRequest, res: VercelResponse) {
  const { page, per_page } = req.query

  const ret = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${
      process.env.ACCOUNT_ID
    }/images/v1?page=${page || '1'}&per_page=${per_page || '100'}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )

  res.status(200).json(await ret.json())
}
