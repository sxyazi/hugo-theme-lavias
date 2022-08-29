export const parse = (s: string) => {
  const parser = new DOMParser()
  return parser.parseFromString(s, 'text/html')
}

export const formatDate = (date: Date, format: string) => {
  return format.replace(/[Ymdw]/g, ($0) => {
    switch ($0) {
      case 'Y':
        return String(date.getFullYear())
      case 'm':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]
      case 'd':
        return String(date.getDate())
      case 'w':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
      default:
        return $0
    }
  })
}
