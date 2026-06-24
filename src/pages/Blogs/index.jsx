import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import Navbar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import { fetchBlogs } from './Api/blogs'
import TopSection from './components/TopSection'
import MiddleSection from './components/MiddleSection'


export default function Blogs() {
  const [featured, setFeatured] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Blogs - TasBon Bounty Platform'
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchBlogs({ page: 1, limit: 20 })
      .then((res) => {
        const data = res.data || []
        setPosts(data)
        setFeatured(data.length > 0 ? data[0] : null)
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to load blogs')
        setPosts([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FFFEFF] font-sans">
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <TopSection featuredPost={featured} />
          <MiddleSection posts={posts} />

        </>
      )}
      <Footer />
    </div>
  )
}
