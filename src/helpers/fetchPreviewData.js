import axios from 'axios'
import { getLinkPreview } from 'link-preview-js'

const CORS_PROXY_BASE_PATH = 'https://cors-anywhere.herokuapp.com/'

export default async function fetchPreviewData (link) {
  const url = `${CORS_PROXY_BASE_PATH}${link}`
  const data = await getLinkPreview(url)
  return { ...data, _link: link }
}