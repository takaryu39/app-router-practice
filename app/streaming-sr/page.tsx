export const revalidate = 0

import { Suspense } from 'react'
import Spinner from '../components/spinner'
import BlogList from '../components/blog-list'
import NewsList from '../components/news-list'

const StreamingServerRenderingPage = () => {
  return (
    <section className="flex">
      <aside className="w-1/4">
        <section className="fixed m-1 w-1/4 border border-blue-500 bg-gray-200 p-1">
          <Suspense fallback={<Spinner color="border-green-500" />}>
            {/*@ts-ignore*/}
            <BlogList />
          </Suspense>
        </section>
      </aside>
      <main>
        <section className="fixed w-3/4">
          <Suspense fallback={<Spinner />}>
            {/*@ts-ignore*/}
            <NewsList />
          </Suspense>
        </section>
      </main>
    </section>
  )
}

export default StreamingServerRenderingPage
