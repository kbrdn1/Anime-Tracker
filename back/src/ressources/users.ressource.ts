// Ressource for users - users.ressource.ts
import { User } from '@/types'

const usersRessource = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar,
    role: user.role,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  } as User
}

export default usersRessource
