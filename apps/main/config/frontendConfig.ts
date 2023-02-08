import ThirdPartyReact, {Google, Facebook} from 'supertokens-auth-react/recipe/thirdparty'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import Router from 'next/router'

export const frontendConfig = () => {
  return {
    appInfo: {
        apiDomain: window.location.origin,
        apiBasePath: "/api/auth",
        appName: '...',
        websiteDomain: 'https://localhost:3000'
    },
    recipeList: [
      ThirdPartyReact.init({
        signInAndUpFeature: {
          providers: [],
        },
      }),
      SessionReact.init(),
    ],
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href)
          },
        },
      }
    },
  }
}
