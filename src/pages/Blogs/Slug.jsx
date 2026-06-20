import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import { fetchBlog } from './Api/blogs'

function setMeta(name, property, content) {
  let el = property
    ? document.querySelector(`meta[property="${property}"]`)
    : document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    if (property) el.setAttribute('property', property)
    else el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function BlogSlug() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetchBlog(slug)
      .then((res) => setPost(res.data))
      .catch((err) => {
        toast.error(err.message || 'Failed to load blog post')
        navigate('/blogs', { replace: true })
      })
      .finally(() => setLoading(false))
  }, [slug, navigate])

  useEffect(() => {
    if (!post) return
    document.title = `${post.title} - TasBon Blog`

    const description = post.message?.slice(0, 160) || ''
    setMeta('description', null, description)
    setMeta(null, 'og:title', `${post.title} - TasBon Blog`)
    setMeta(null, 'og:description', description)
    setMeta(null, 'og:image', post.imageUrl)
    setMeta(null, 'og:type', 'article')
  }, [post])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0FAF4] font-sans">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-20">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="w-full h-72 bg-gray-200 rounded-2xl" />
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-48" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </div>
            </div>
            <div className="space-y-3 pt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 bg-gray-200 rounded ${i % 3 === 0 ? 'w-3/4' : 'w-full'}`}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) return null

  const readTime = Math.max(
    1,
    Math.ceil((post.message || '').split(' ').length / 200),
  )

  return (
    <div className="min-h-screen bg-[#F0FAF4] font-sans">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.message?.slice(0, 160),
            image: post.imageUrl,
            datePublished: post.date || post.createdAt,
            author: {
              '@type': 'Person',
              name: post.author,
            },
          }),
        }}
      />

      <Navbar />

      <article className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        {/* Back link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Blogs
        </Link>

        {/* Hero image */}
        {post.imageUrl && (
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-sm">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={14} />
            {new Date(post.date || post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200 mb-8">
          {post.authorImage ? (
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <User size={20} className="text-emerald-600" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-400">Author</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {post.message}
          </p>
        </div>
      </article>

      <Footer />
    </div>
  )
}
