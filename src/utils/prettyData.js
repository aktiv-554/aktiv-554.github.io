export default function prettyDate(dateString) {
  if (!dateString) {
    return dateString
  }
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(' г.', '')
}
