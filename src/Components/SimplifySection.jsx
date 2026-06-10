import { motion } from 'framer-motion'
import BountyCard from '../Assets/reward.png'

const CheckIcon = ({ className = 'w-8 h-8 text-emerald-600' }) => (
  <svg
    width="40"
    className={className}
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.87587 5.32766C8.15821 5.2975 9.50262 5.32156 10.7885 5.32211L18.2935 5.32109L24.5098 5.32227C25.5733 5.32152 26.6396 5.31113 27.704 5.31832C28.4549 5.3234 28.7399 5.80879 29.2438 6.35524C29.2557 6.41801 29.2652 6.48117 29.2725 6.54465C29.3382 7.11133 29.2975 8.86594 29.2973 9.52297L29.2943 15.5906L29.2929 23.8297L29.2961 26.4081C29.2971 26.9301 29.3057 27.4593 29.2794 27.9787C29.2655 28.2537 29.1853 28.4786 28.997 28.687C28.5675 29.1627 28.3959 29.231 27.8134 29.2905L12.1561 29.2848L8.49204 29.2876C7.92958 29.291 7.15231 29.3468 6.60973 29.2727C5.81047 29.1635 5.33528 28.3786 5.32794 27.6326C5.3134 26.1514 5.31754 24.6891 5.31922 23.2166L5.32051 14.8766L5.32032 9.59852C5.3195 8.73809 5.27122 7.14465 5.40981 6.35086C5.97254 5.93164 6.14946 5.36953 6.87587 5.32766ZM13.2158 18.775C13.1717 18.7226 13.1259 18.6716 13.0784 18.6221C12.6665 18.2008 11.0877 16.4989 10.6056 16.4997C10.2841 16.5002 10.0962 16.7353 9.88751 16.9458C9.76145 17.2498 9.75524 17.4244 9.7418 17.7535C10.0709 18.465 10.9882 19.1503 11.5494 19.7267C12.0452 20.236 12.5802 20.7571 13.0672 21.2757C13.2804 21.5027 13.665 21.8299 13.8314 22.0151C14.343 22.56 15.1338 23.6534 15.9444 22.9283C16.1647 22.7313 16.3704 22.5051 16.582 22.2963L18.1176 20.7686L22.2538 16.6055C22.4921 16.3625 22.7665 16.1395 23.0058 15.8964C23.3075 15.5901 23.5593 15.2742 23.8755 14.9784C24.5581 14.3398 25.2581 13.6935 25.9068 13.0217C26.0887 12.8333 26.2049 12.6155 26.2412 12.3455C26.2802 12.0725 26.3264 11.4739 26.1504 11.2552C25.9181 10.9666 24.8438 11.0737 24.5921 11.2793C23.8693 11.8695 23.2678 12.5773 22.64 13.257C22.067 13.8773 21.3812 14.4238 20.7948 15.0254L17.6138 18.2743C16.9377 18.9522 16.2654 19.6497 15.5246 20.2588C15.3209 20.4263 15.1821 20.403 14.9287 20.3836C14.8802 20.3464 14.7175 20.282 14.6532 20.2544L14.4924 20.1175C14.1204 19.8824 13.8384 19.6767 13.5932 19.3006C13.441 19.0673 13.4219 18.9738 13.2158 18.775Z"
      fill="#1F7242"
    />
    <path
      d="M13.2158 18.7749C13.3039 18.749 13.4647 18.6804 13.5268 18.7387C13.6796 18.882 14.6171 19.6786 14.6747 19.7908C14.6777 19.9475 14.6039 20.0163 14.4924 20.1174C14.1204 19.8822 13.8384 19.6766 13.5932 19.3005C13.441 19.0672 13.4219 18.9737 13.2158 18.7749Z"
      fill="#1F7242"
    />
    <path
      d="M32.0402 10.7077C32.9437 10.7188 33.6077 10.5318 34.2926 11.3351C34.3697 11.4254 34.4485 11.5158 34.5573 11.5666C34.7562 12.1538 34.6865 15.6672 34.6866 16.5305L34.6872 23.3377L34.6899 29.8188C34.6903 30.9458 34.6922 32.0729 34.6833 33.2001C34.6803 33.5927 34.5261 33.8316 34.2436 34.0896C34.1967 34.1324 33.7627 34.5555 33.7494 34.5868C33.0592 34.7289 32.2711 34.6859 31.5586 34.6829L28.8142 34.6739L17.155 34.6757L13.6044 34.6739C13.2664 34.6727 12.3224 34.6348 12.0316 34.6587C11.8676 34.619 11.6759 34.5425 11.5148 34.4834C11.4583 34.4222 11.2897 34.2791 11.2202 34.2164C11.2092 34.1961 10.9779 33.9523 10.941 33.911L10.8897 33.8592C10.6136 33.1668 10.6967 32.9194 10.7035 32.1874C10.7209 32.1614 10.7587 32.1232 10.7812 32.0986C11.1793 31.9818 14.2919 32.0391 14.9389 32.0328C18.6932 31.9964 22.4992 32.0844 26.2517 32.0235C27.1183 31.4354 27.0179 31.6758 27.9633 31.5353C28.4214 31.4671 29.3267 30.8732 29.7045 30.5688C29.9906 30.3295 30.3105 29.9812 30.5752 29.7079C30.9093 29.3593 31.4175 28.3911 31.5171 27.9198C31.5813 27.6155 31.6166 27.055 31.6623 26.7196C31.8382 26.5418 31.9759 26.3661 32.0008 26.107C32.0528 25.5673 32.0355 24.9782 32.0352 24.4343L32.0337 21.532C32.0342 17.9412 31.9977 14.2929 32.0402 10.7077Z"
      fill="#1F7242"
    />
    <path
      d="M29.7046 30.5689C29.9906 30.3295 30.3106 29.9813 30.5753 29.708C30.6042 29.8419 30.6458 29.9105 30.5722 30.0295C30.4368 30.2491 30.1611 30.5118 29.9197 30.6041C29.8413 30.5939 29.7819 30.5857 29.7046 30.5689Z"
      fill="#1F7242"
    />
  </svg>
)

const features = [
  {
    title: 'Complete & Earn',
    desc: 'Find tasks, submit work, and earn rewards.',
  },
  {
    title: 'Join Challenges',
    desc: 'Participate in weekly contests to boost your skills and win prizes.',
  },
  {
    title: 'Track Progress',
    desc: 'Monitor your achievements and unlock new opportunities.',
  },
]

export default function SimplifySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Simplify your Bounty Experience
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Whether you're completing tasks for rewards or launching bounties
            for your project, TASBUN makes the experience simple, transparent,
            and rewarding.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left: Feature list */}
          <div className="flex-1 m-auto">
            <motion.h3
              className="text-xl font-sora font-extrabold text-gray-900 mb-3"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              Earn or Offer Bounties <br /> Effortlessly
            </motion.h3>
            <motion.p
              className="text-gray-500 mb-10 max-w-lg text-base"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              Discover bounties that match your skills and get rewarded when you
              complete them. Hosting a task? Set your bounty, define
              requirements, and let the community solve it.
            </motion.p>
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                },
              }}
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  className="flex items-start gap-4"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: 'easeOut' },
                    },
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0">
                    <CheckIcon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">
                      {f.title}
                    </div>
                    <div className="text-gray-500 w-80 text-sm font-semibold">
                      {f.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Bounty Card Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <img
              src={BountyCard}
              alt="Bounty Card"
              className="w-full max-w-lg object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
