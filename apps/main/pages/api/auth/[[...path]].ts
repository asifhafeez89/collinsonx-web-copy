require('dotenv').config();
import supertokens from 'supertokens-node';
import { middleware } from 'supertokens-node/framework/express';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { Request, Response } from 'express';

// import { backendConfig } from '../../../config/backendConfig';

// supertokens.init(backendConfig());

export default async function superTokens(req: Request, res: Response) {
  await superTokensNextWrapper(
    async (next) => {
      await middleware()(req, res, next);
    },
    req,
    res
  );
  if (!res.writableEnded) {
    res.status(404).send('Not found');
  }
}
