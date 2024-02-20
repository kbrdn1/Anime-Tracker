// Type definition for Pagination - Paginator.d.ts
import type { User } from './'

type PagigateEntity = User

type Pagination = {
  items: PagigateEntity[]
  meta: Metadata
}

type Metadata = {
  total: number
  pagesCount: number
  currentPage: number
  limit: number
  pages: string[]
}

export default Pagination
