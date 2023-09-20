import * as sdk from '@ory/client';

export const oryUserAddr = process.env.NEXT_PUBLIC_USER_SERVICE_ADDR;
export const oryPublicAddr = process.env.NEXT_PUBLIC_KRATOS_ADDR;

export const oryClient = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: oryPublicAddr,
    baseOptions: {
      withCredentials: true,
    },
  })
);

export const oryServer = new sdk.FrontendApi(
  new sdk.Configuration({
    basePath: process.env.KRATOS_ADDR,
    baseOptions: {
      withCredentials: true,
    },
  })
);
