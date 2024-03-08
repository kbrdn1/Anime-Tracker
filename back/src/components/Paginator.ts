// Paginator component for pagination - Paginator.ts
import type { Pagination } from '@/types'
import {
  getPagesCount,
  getPagesUrls,
  getOffset,
  getCurrentPage,
  getPage,
} from '@/utils'
import { tr } from '@faker-js/faker'

const Paginator = async (
  params: Record<string, string>,
  service: any,
  url: string
) => {
  const { limit, page, orderBy, order, trash } = params

  const count: number = await service.count(params, trash === 'true')
  const pagesCount = getPagesCount(count, limit ? Number(limit) : 50)
  const currentPage: number = getCurrentPage(
    page ? getPage(page) : 1,
    pagesCount
  )

  const items = await service.getAll(
    params,
    limit ? Number(limit) : 50,
    getOffset(currentPage, limit ? Number(limit) : 50),
    orderBy,
    order,
    trash === 'true'
  )

  const pages = getPagesUrls(pagesCount, currentPage, url)

  const pagination: Pagination = {
    items,
    meta: {
      total: count,
      pagesCount,
      currentPage,
      limit: limit ? Number(limit) : 50,
      pages,
    },
  }

  return pagination
}

export default Paginator
