import { motion } from "framer-motion"
import {
  Film,
  Tv,
  Star,
  Bookmark,
  Search,
  Play,
  Users,
  Shield,
  Mail,
  MessageSquare,
  Github,
  Twitter,
  Instagram,
  Youtube,
  Heart,
} from "lucide-react"
import Layout from "../components/layout/Layout"
import Link from "next/link"

export default function AboutPage() {
  return (
    <Layout title="About Us">
      {/* Hero Section */}
      <div
        className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgb(17,17,17)), url(https://image.tmdb.org/t/p/original//uUiIGztTrfDhPdAFJpr6m4UBMAd.jpg)`,
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,17,17,0.7)] via-[rgba(17,17,17,0.4)] to-[rgb(17,17,17)]"></div>

        <div className="w-full h-full flex flex-col justify-center items-center relative z-10 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            About <span className="text-violet-500">RC</span>MOVIES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            Your ultimate destination for movies and TV shows
          </motion.p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[rgb(17,17,17)] py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Our Story</h2>
            <div className="relative">
              <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                RCMOVIES was founded with a simple mission: to create the ultimate platform for movie and TV show
                enthusiasts. We believe that great entertainment should be accessible, organized, and enjoyable to
                discover.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our team of passionate developers and movie buffs has worked tirelessly to build a platform that not
                only showcases the latest and greatest in entertainment but also provides a seamless user experience for
                finding, tracking, and enjoying your favorite content.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether you're looking for blockbuster movies, binge-worthy TV shows, or hidden gems, RCMOVIES is
                designed to be your go-to destination for all things entertainment.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[2/3] rounded-lg overflow-hidden">
                <img
                  src="https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
                  alt="Movies"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[2/3] rounded-lg overflow-hidden mt-8">
                <img
                  src="https://image.tmdb.org/t/p/w500/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg"
                  alt="TV Shows"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[rgb(13,13,13)] py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">What We Offer</h2>
            <div className="relative mx-auto">
              <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the features that make RCMOVIES the perfect platform for all your entertainment needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Film className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Extensive Movie Library</h3>
              <p className="text-gray-400">
                Access thousands of movies from classics to the latest releases, all organized for easy browsing and
                discovery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Tv className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">TV Show Collection</h3>
              <p className="text-gray-400">
                Keep track of your favorite series, discover new shows, and never miss an episode with our comprehensive
                TV section.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Bookmark className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Personalized Lists</h3>
              <p className="text-gray-400">
                Create and manage your watchlist, keep track of what you've seen, and get recommendations based on your
                preferences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Star className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Ratings & Reviews</h3>
              <p className="text-gray-400">
                See what critics and other users think, and share your own opinions on the movies and shows you watch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Search</h3>
              <p className="text-gray-400">
                Find exactly what you're looking for with our powerful search and filtering options by genre, year,
                rating, and more.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Play className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Seamless Playback</h3>
              <p className="text-gray-400">
                Enjoy a smooth viewing experience with our optimized player and continue watching feature that remembers
                where you left off.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[rgb(17,17,17)] py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Frequently Asked Questions</h2>
            <div className="relative">
              <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[rgb(22,22,22)] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Is RCMOVIES free to use?</h3>
              <p className="text-gray-400">
                Yes, RCMOVIES is completely free to use. We provide access to information about movies and TV shows
                without any subscription fees.
              </p>
            </div>

            <div className="bg-[rgb(22,22,22)] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">How do I create a watchlist?</h3>
              <p className="text-gray-400">
                Simply create an account and click the "Add to List" button on any movie or TV show page to add it to
                your personal watchlist.
              </p>
            </div>

            <div className="bg-[rgb(22,22,22)] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Where does RCMOVIES get its data?</h3>
              <p className="text-gray-400">
                We source our data from The Movie Database (TMDB) API, which provides comprehensive information about
                movies and TV shows.
              </p>
            </div>

            <div className="bg-[rgb(22,22,22)] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Can I request new features?</h3>
              <p className="text-gray-400">
                We're always looking to improve. You can send feature requests through our contact form or email us
                directly.
              </p>
            </div>

            <div className="bg-[rgb(22,22,22)] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">How often is content updated?</h3>
              <p className="text-gray-400">
                Our database is updated daily with new releases, ratings, and information to ensure you always have
                access to the latest content.
              </p>
            </div>

            <div className="bg-[rgb(22,22,22)] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Is RCMOVIES available on mobile?</h3>
              <p className="text-gray-400">
                Yes, RCMOVIES is fully responsive and works on all devices including smartphones, tablets, and desktop
                computers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-[rgb(13,13,13)] py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Our Values</h2>
            <div className="relative mx-auto">
              <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide everything we do at RCMOVIES</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-violet-700/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="text-violet-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Community First</h3>
              <p className="text-gray-400">
                We build for our users and value their feedback above all else. Our community shapes the future of
                RCMOVIES.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-violet-700/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="text-violet-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Quality & Reliability</h3>
              <p className="text-gray-400">
                We're committed to providing accurate information and a reliable platform that our users can count on.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-violet-700/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="text-violet-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Passion for Entertainment</h3>
              <p className="text-gray-400">
                We're movie and TV enthusiasts ourselves, and we channel that passion into creating the best possible
                platform.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-[rgb(17,17,17)] py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Get In Touch</h2>
            <div className="relative mx-auto">
              <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions, feedback, or just want to say hello? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg text-center"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Mail className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Email Us</h3>
              <p className="text-gray-400 mb-4">Send us an email and we'll get back to you as soon as possible.</p>
              <a href="mailto:contact@rcmovies.com" className="text-violet-500 hover:text-violet-400 transition-colors">
                contact@rcmovies.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg text-center"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MessageSquare className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Social Media</h3>
              <p className="text-gray-400 mb-4">Connect with us on social media for updates and more.</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                  <Youtube size={20} />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[rgb(22,22,22)] p-6 rounded-lg text-center"
            >
              <div className="bg-violet-700/20 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Github className="text-violet-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">GitHub</h3>
              <p className="text-gray-400 mb-4">Check out our open-source projects and contribute.</p>
              <a href="#" className="text-violet-500 hover:text-violet-400 transition-colors">
                github.com/rcmovies
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-violet-700 py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Explore?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Discover thousands of movies and TV shows, create your watchlist, and start enjoying the best entertainment
            experience.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-violet-700 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </Layout>
  )
}

