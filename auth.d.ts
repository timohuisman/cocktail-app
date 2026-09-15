declare module '#auth-utils' {
  interface User {
    id: string
    username: string
    email: string | null
    thumb: string | null
  }
}

export {}
