import ThirdPartyNode from 'supertokens-node/recipe/thirdparty'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
        connectionURI: "https://authz.lifestyle-x.io",
      // apiKey: <API_KEY(if configured)>,
    },
    appInfo,
    recipeList: [
      ThirdPartyNode.init({
        signInAndUpFeature: {
          providers: [
],
        }
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  }
}
