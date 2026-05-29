import Img from '../Assets/img.png'

const posts = [
  {
    title: 'Participation Techniques: Making the Right Protocol Decisions',
    date: 'Feb 2025',
    readTime: '5 min read',
    image: Img,
  },
  {
    title: 'Participation Techniques: Making the Right Protocol Decisions',
    date: 'Feb 2025',
    readTime: '4 min read',
    image: Img,
  },
  {
    title: 'Participation Techniques: Making the Right Protocol Decisions',
    date: 'Feb 2025',
    readTime: '6 min read',
    image: Img,
  },
  {
    title: 'Participation Techniques: Making the Right Protocol Decisions',
    date: 'Feb 2025',
    readTime: '3 min read',
    image: Img,
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left text */}
          <div className="lg:w-125 shrink-0">
            <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Articles &amp; Blogs
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Learn how to launch, manage, and grow successful bounty programs.
            </h2>
            <p className="text-gray-500 text-base mb-2">
              <strong>Learn • Build • Earn</strong>
            </p>
            <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 cursor-pointer py-3 rounded-xl transition-colors text-sm">
              View more
            </button>
          </div>

          {/* Right: blog grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {posts.map((post, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Blog Image */}
                <div className="w-full h-40 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2">
                    {post.title}
                  </h3>
                  <span className="text-xs text-emerald-600 font-semibold hover:underline">
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
