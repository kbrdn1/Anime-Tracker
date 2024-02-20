// Utils for regular expressions - regex.ts
export const JWTregex = RegExp(
  /Bearer\s([a-zA-Z0-9-_.]+)\.([a-zA-Z0-9-_.]+)\.([a-zA-Z0-9-_.]+)/
)
