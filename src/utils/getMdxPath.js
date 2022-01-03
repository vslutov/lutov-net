module.exports = (collection, path) => {
  const prefixes = {
    pages: "/",
    posts: "/posts/"
  }
  path = path.replace(/\/$/, "")
  return `${prefixes[collection]}${path}`
}
