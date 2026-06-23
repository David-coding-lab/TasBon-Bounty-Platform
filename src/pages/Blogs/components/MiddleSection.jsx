import { Link } from 'react-router-dom'

const tags = [
  'Tech',
  'Bounties',
  'Community',
  'Builder',
  'Guides',
  'AI Agents',
  'ReFi',
  'Grants',
  'Hackathons',
  'Tutorial',
  'Career',
  'Web3',
]

export default function MiddleSection({ posts }) {
  const latestPosts = posts.slice(0, 6)
  const popularPosts = posts.slice(1, 4)

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Latest Articles */}
        <div className="lg:col-span-2 border-gray-200 rounded-lg bg-white p-6 space-y-6">
          {latestPosts.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No articles yet.</p>
          ) : (
            latestPosts.map((article, i) => (
              <article
                key={article.id}
                className={`flex gap-4 md:gap-6 pb-6 ${
                  i !== latestPosts.length - 1 ? 'border-b border-gray-100' : 'pb-0'
                }`}
              >
                <img
                  src={article.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300'}
                  alt={article.title}
                  className="w-40 h-32 md:w-48 md:h-36 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <span className="text-green-600 text-xs font-semibold uppercase">
                    {article.category || 'HACKATHONS'}
                  </span>

                  <h3 className="font-bold text-lg md:text-xl mt-2 mb-2 hover:text-green-600 cursor-pointer">
                    <Link to={`/blogs/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    {article.message
                      ? article.message.slice(0, 120) + (article.message.length > 120 ? '...' : '')
                      : ''}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {article.authorImage ? (
                      <img
                        src={article.authorImage}
                        className="w-5 h-5 rounded-full object-cover"
                        alt={article.author}
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[8px] font-semibold text-emerald-700">
                        {article.author?.charAt(0)}
                      </div>
                    )}
                    <span className="font-medium">{article.author}</span>
                    <span>•</span>
                    <span>
                      {article.date
                        ? new Date(article.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : ''}
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Popular Articles */}
          <div className="border border-gray-200 rounded-lg bg-white p-6">
            <h3 className="font-bold text-lg mb-4">Popular Articles</h3>
            <div className="space-y-4">
              {popularPosts.length === 0 ? (
                <p className="text-gray-400 text-sm">No articles yet.</p>
              ) : (
                popularPosts.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blogs/${article.slug}`}
                    className="flex gap-3 hover:opacity-80 transition"
                  >
                    <img
                      src={article.imageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150'}
                      alt={article.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-snug mb-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {article.date
                          ? new Date(article.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : ''}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="border border-gray-200 rounded-lg bg-white p-6">
            <h3 className="font-bold text-lg mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/${tag.toLowerCase()}`}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-600 transition"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}