export function formatWalletAddress(address) {
  if (typeof address !== 'string') return ''

  const value = address.trim()
  if (value.length <= 13) return value

  return `${value.slice(0, 6)}***${value.slice(-4)}`
}
