const articles = Array(4).fill({
  title: 'Lessons from a winning hackathon team',
  desc: 'Key takeaways from teams that build, ship and win together.',
  date: 'May 05, 2025',
  read: '6 min read',
  author: 'TASBUN',
})

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

export default function LatestSection() {
  const articles = Array(4).fill({
    category: 'HACKATHONS',
    title: 'Lessons from a winning hackathon team',
    desc: 'Key takeaways from teams that build, ship and win together.',
    author: 'TASBUN',
    date: 'May 05, 2025',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300',
  })

  const popularArticles = Array(3).fill({
    title: 'Lessons from a winning hackathon team',
    date: 'May 05, 2025',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150',
  })

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Latest Articles - White border + padding */}
        <div className="lg:col-span-2 border-gray-200 rounded-lg bg-white p-6 space-y-6">
          {articles.map((article, i) => (
            <article
              key={i}
              className={`
                flex gap-4 md:gap-6 pb-6
                ${i !== articles.length - 1 ? 'border-b border-gray-100' : 'pb-0'}
              `}
            >
              <img
                src={article.img}
                alt={article.title}
                className="w-40 h-32 md:w-48 md:h-36 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1">
                <span className="text-green-600 text-xs font-semibold uppercase">
                  {article.category}
                </span>

                <h3 className="font-bold text-lg md:text-xl mt-2 mb-2 hover:text-green-600 cursor-pointer">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">{article.desc}</p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <img
                    src="https://i.pravatar.cc/24"
                    className="w-5 h-5 rounded-full"
                    alt="author"
                  />
                  <span className="font-medium">{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span className="text-green-600">{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Popular Articles - White border + padding */}
          <div className="border border-gray-200 rounded-lg bg-white p-6">
            <h3 className="font-bold text-lg mb-4">Popular Articles</h3>
            <div className="space-y-4">
              {popularArticles.map((article, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex gap-3 hover:opacity-80 transition"
                >
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium leading-snug mb-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                </a>
              ))}
            </div>
            <a
              href="/popular"
              className="text-green-600 text-sm font-medium mt-4 inline-block hover:underline"
            >
              View popular →
            </a>
          </div>

          {/* Tags - White border + padding */}
          <div className="border border-gray-200 rounded-lg bg-white p-6">
            <h3 className="font-bold text-lg mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/${tag.toLowerCase()}`}
                  className="px-3 py-1.5 text-sm border-gray-200 rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-600 transition"
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
