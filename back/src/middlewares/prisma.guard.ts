// Middlewares to intercept prisma requests - prisma.guard.ts
import { PrismaClient } from '@prisma/client'
import { HTTPException } from 'hono/http-exception'

const prisma = new PrismaClient().$extends({
  model: {
    users: {
      delete: async (params: any) => {
        const user = await prisma.users.findUnique({
          where: { id: params.where.id },
        })

        if (!user) throw new HTTPException(404, { message: 'User not found' })

        const updatedUser = await prisma.users.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedUser)
          throw new HTTPException(500, { message: 'Failed to delete user' })

        return updatedUser
      },
      deleteMany: async (params: any) => {
        const users = await prisma.users.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!users) throw new HTTPException(404, { message: 'Users not found' })

        const updatedUsers = await prisma.users.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedUsers)
          throw new HTTPException(500, { message: 'Failed to delete users' })

        return updatedUsers
      },
    },
    authors: {
      delete: async (params: any) => {
        const author = await prisma.authors.findUnique({
          where: { id: params.where.id },
        })

        if (!author)
          throw new HTTPException(404, { message: 'Author not found' })

        const updatedAuthor = await prisma.authors.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedAuthor)
          throw new HTTPException(500, { message: 'Failed to delete author' })

        return updatedAuthor
      },
      deleteMany: async (params: any) => {
        const authors = await prisma.authors.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!authors)
          throw new HTTPException(404, { message: 'Authors not found' })

        const updatedAuthors = await prisma.authors.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedAuthors)
          throw new HTTPException(500, { message: 'Failed to delete authors' })

        return updatedAuthors
      },
    },
    genders: {
      delete: async (params: any) => {
        const gender = await prisma.genders.findUnique({
          where: { id: params.where.id },
        })

        if (!gender)
          throw new HTTPException(404, { message: 'Gender not found' })

        const updatedGender = await prisma.genders.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedGender)
          throw new HTTPException(500, { message: 'Failed to delete gender' })

        return updatedGender
      },
      deleteMany: async (params: any) => {
        const genders = await prisma.genders.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!genders)
          throw new HTTPException(404, { message: 'Genders not found' })

        const updatedGenders = await prisma.genders.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedGenders)
          throw new HTTPException(500, { message: 'Failed to delete genders' })

        return updatedGenders
      },
    },
    statuses: {
      delete: async (params: any) => {
        const status = await prisma.statuses.findUnique({
          where: { id: params.where.id },
        })

        if (!status)
          throw new HTTPException(404, { message: 'Status not found' })

        const updatedStatus = await prisma.statuses.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedStatus)
          throw new HTTPException(500, { message: 'Failed to delete status' })

        return updatedStatus
      },
      deleteMany: async (params: any) => {
        const statuses = await prisma.statuses.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!statuses)
          throw new HTTPException(404, { message: 'Statuses not found' })

        const updatedStatuses = await prisma.statuses.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedStatuses)
          throw new HTTPException(500, { message: 'Failed to delete statuses' })

        return updatedStatuses
      },
    },
    studios: {
      delete: async (params: any) => {
        const studio = await prisma.studios.findUnique({
          where: { id: params.where.id },
        })

        if (!studio)
          throw new HTTPException(404, { message: 'Studio not found' })

        const updatedStudio = await prisma.studios.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedStudio)
          throw new HTTPException(500, { message: 'Failed to delete studio' })

        return updatedStudio
      },
      deleteMany: async (params: any) => {
        const studios = await prisma.studios.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!studios)
          throw new HTTPException(404, { message: 'Studios not found' })

        const updatedStudios = await prisma.studios.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedStudios)
          throw new HTTPException(500, { message: 'Failed to delete studios' })

        return updatedStudios
      },
    },
    animeTypes: {
      delete: async (params: any) => {
        const animeType = await prisma.animeTypes.findUnique({
          where: { id: params.where.id },
        })

        if (!animeType)
          throw new HTTPException(404, { message: 'Anime type not found' })

        const updatedAnimeType = await prisma.animeTypes.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedAnimeType)
          throw new HTTPException(500, { message: 'Failed to delete anime type' })

        return updatedAnimeType
      },
      deleteMany: async (params: any) => {
        const animeTypes = await prisma.animeTypes.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!animeTypes)
          throw new HTTPException(404, { message: 'Anime types not found' })

        const updatedAnimeTypes = await prisma.animeTypes.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedAnimeTypes)
          throw new HTTPException(500, { message: 'Failed to delete anime types' })

        return updatedAnimeTypes
      },
    },
    themes: {
      delete: async (params: any) => {
        const theme = await prisma.themes.findUnique({
          where: { id: params.where.id },
        })

        if (!theme)
          throw new HTTPException(404, { message: 'Theme not found' })

        const updatedTheme = await prisma.themes.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedTheme)
          throw new HTTPException(500, { message: 'Failed to delete theme' })

        return updatedTheme
      },
      deleteMany: async (params: any) => {
        const themes = await prisma.themes.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!themes)
          throw new HTTPException(404, { message: 'Themes not found' })

        const updatedThemes = await prisma.themes.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedThemes)
          throw new HTTPException(500, { message: 'Failed to delete themes' })

        return updatedThemes
      },
    },
    episodes: {
      delete: async (params: any) => {
        const episode = await prisma.episodes.findUnique({
          where: { id: params.where.id },
        })

        if (!episode)
          throw new HTTPException(404, { message: 'Episode not found' })

        const updatedEpisode = await prisma.episodes.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedEpisode)
          throw new HTTPException(500, { message: 'Failed to delete episode' })

        return updatedEpisode
      },
      deleteMany: async (params: any) => {
        const episodes = await prisma.episodes.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!episodes)
          throw new HTTPException(404, { message: 'Episodes not found' })

        const updatedEpisodes = await prisma.episodes.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedEpisodes)
          throw new HTTPException(500, { message: 'Failed to delete episodes' })

        return updatedEpisodes
      },
    },
    seasons: {
      delete: async (params: any) => {
        const season = await prisma.seasons.findUnique({
          where: { id: params.where.id },
        })

        if (!season)
          throw new HTTPException(404, { message: 'Season not found' })

        const updatedSeason = await prisma.seasons.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedSeason)
          throw new HTTPException(500, { message: 'Failed to delete season' })

        return updatedSeason
      },
      deleteMany: async (params: any) => {
        const seasons = await prisma.seasons.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!seasons)
          throw new HTTPException(404, { message: 'Seasons not found' })

        const updatedSeasons = await prisma.seasons.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedSeasons)
          throw new HTTPException(500, { message: 'Failed to delete seasons' })

        return updatedSeasons
      },
    },
    animes: {
      delete: async (params: any) => {
        const anime = await prisma.animes.findUnique({
          where: { id: params.where.id },
        })

        if (!anime) throw new HTTPException(404, { message: 'Anime not found' })

        const updatedAnime = await prisma.animes.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        if (!updatedAnime)
          throw new HTTPException(500, { message: 'Failed to delete anime' })

        return updatedAnime
      },
      deleteMany: async (params: any) => {
        const animes = await prisma.animes.findMany({
          where: { id: { in: params.where.id } },
        })

        if (!animes) throw new HTTPException(404, { message: 'Animes not found' })

        const updatedAnimes = await prisma.animes.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        if (!updatedAnimes)
          throw new HTTPException(500, { message: 'Failed to delete animes' })

        return updatedAnimes
      },
    },
  },
})
export default prisma
