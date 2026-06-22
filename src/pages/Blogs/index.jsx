import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Navbar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import { fetchBlogs } from './Api/blogs'

const CATEGORIES = [
  'All',
  'Technology',
  'Design',
  'Business',
  'Leadership',
  'Health',
]

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  })

  const activeCategory = searchParams.get('category') || 'All'
  const page = parseInt(searchParams.get('page') || '1', 10)

  useEffect(() => {
    document.title = 'Blogs - TasBon Bounty Platform'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc)
      metaDesc.setAttribute(
        'content',
        'Explore bounty program insights, tutorials, and guides on the TasBon blog.',
      )
    const metaOg = document.querySelector('meta[property="og:title"]')
    if (metaOg) metaOg.setAttribute('content', 'Blogs - TasBon Bounty Platform')
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page, activeCategory])

  useEffect(() => {
    setLoading(true)
    const category = activeCategory === 'All' ? undefined : activeCategory
    fetchBlogs({ page, limit: 6, category })
      .then((res) => {
        setPosts(res.data)
        setPagination(res.pagination)
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to load blogs')
        setPosts([])
      })
      .finally(() => setLoading(false))
  }, [page, activeCategory])

  const handleCategory = useCallback(
    (cat) => {
      const params = new URLSearchParams()
      if (cat !== 'All') params.set('category', cat)
      params.set('page', '1')
      setSearchParams(params, { replace: true })
    },
    [setSearchParams],
  )

  const handlePage = useCallback(
    (p) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', String(p))
      setSearchParams(params, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  return (
    <div className="min-h-screen bg-[#F0FAF4] font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            Our Blog
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Insights &amp; Guides
          </motion.h1>
          <motion.p
            className="text-gray-500 text-lg max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Learn how to launch, manage, and grow successful bounty programs.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <div className="h-3 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No blog posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group h-full"
                  >
                    <div className="w-full h-48 overflow-hidden relative">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-emerald-500/80 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h2 className="text-base font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                        {post.message}
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        {post.authorImage ? (
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-semibold text-emerald-700">
                            {post.author?.charAt(0)}
                          </div>
                        )}
                        <span className="text-xs text-gray-500 font-medium">
                          {post.author}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => handlePage(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Previous
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePage(p)}
                  className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    p === page
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handlePage(page + 1)}
                disabled={page >= pagination.totalPages}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
