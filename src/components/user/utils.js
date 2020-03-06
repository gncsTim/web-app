export const isAdminOrEditor = roles => {
  return roles.includes('_admin') || roles.includes('editor')
}
