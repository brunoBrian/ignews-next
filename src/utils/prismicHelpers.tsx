import Link from 'next/link'
import {
  linkResolver,
  Router
} from '../../prismicConfiguration'

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (type: any, element: any, content: any, children: any, index: any) => (
  <Link
    key={index}
    href={linkResolver(element.data)}
  >
    <a>{content}</a>
  </Link>
)

// Options to be passed to the Client
export const createClientOptions = (req = null, prismicAccessToken: null | string = null, routes = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  // const routesOption = routes ? { routes: Router.routes } : {}
  
  return {
    ...reqOption,
    ...accessTokenOption,
    // ...routesOption,
  }
}
