const LINK_REGEX = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/mig

export default function parseLink (value) {
  const text = value || ''
  const match = text.match(LINK_REGEX)
  const link = match && match.reverse()[0]

  return link
}