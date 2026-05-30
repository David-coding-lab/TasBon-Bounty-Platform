import { motion } from 'framer-motion'
import Localism from '../Assets/localism.png'
import M3tering from '../Assets/m3tering.png'
import Greenpill from '../Assets/greenpill.png'
import Switch from '../Assets/switch.png'

const partners = [
  { name: 'Switch', image: Switch },
  { name: 'Localism', image: Localism },
  { name: 'GreenPill', image: Greenpill },
  { name: 'M3tering', image: M3tering },
]

export default function PartnersSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold text-gray-700 text-center mb-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Our partners
        </motion.h2>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          {partners.map((partner) => (
            <motion.img
              key={partner.name}
              src={partner.image}
              alt={partner.name}
              className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.4, ease: 'easeOut' },
                },
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
