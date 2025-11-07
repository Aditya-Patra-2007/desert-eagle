import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Footer() {
  const footerLinks = [
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/crop-advisor', label: 'Crop Advisor' },
    { to: '/analytics', label: 'Analytics' },
  ]

  return (
    <footer className="bg-desert-tan text-desert-green-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <span>AgriNova360</span>
            </h3>
            <p className="text-sm">
              Revolutionizing agriculture with smart technology and sustainable practices.
              Intelligent farming for the desert.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-desert-gold transition inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm space-y-1">
              <div>Email: info@agrinova360.com</div>
              <div>Phone: +1 (555) 123-4567</div>
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-desert-sandy mt-8 pt-8 text-center text-sm"
        >
          <p>&copy; 2024 AgriNova360. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
