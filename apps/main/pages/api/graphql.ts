import httpProxy from 'http-proxy';
import { ServerResponse } from 'http';
import { NextApiRequest } from 'next';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

console.log(process.env.PRODUCTION_API_URL);

const handler = (req: NextApiRequest, res: ServerResponse) => {
  return new Promise((resolve, reject) => {
    proxy.web(
      req,
      res,
      { target: process.env.PRODUCTION_API_URL, changeOrigin: true },
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      }
    );
  });
};

export default handler;
