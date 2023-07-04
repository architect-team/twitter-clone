import * as sdk from '@ory/client';

export const oryPublicAddr = process.env.NEXT_PUBLIC_KRATOS_ADDR?.replace(
  /\/$/,
  ''
);

export const ory = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: oryPublicAddr,
    baseOptions: {
      withCredentials: true,
    },
  })
);
