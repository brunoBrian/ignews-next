import Prismic from '@prismicio/client'
import { createClientOptions } from "../utils/prismicHelpers";

import {
  apiEndpoint,
  accessToken,
  Router
} from '../../prismicConfiguration'

const getPrismicClient = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
);

export default getPrismicClient
