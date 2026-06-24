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

import TopSection from './components/TopSection'
import MiddleSection from './components/MiddleSection'

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

      <div className=" bg-white text-black"></div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFEFF] text-black font-sans">
        <TopSection />
        <MiddleSection />
      </div>
      <Footer />
    </div>
  )
}
