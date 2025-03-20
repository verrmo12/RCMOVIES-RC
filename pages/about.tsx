import Image from "next/image"
import Link from "next/link"
import {
  Film,
  Tv,
  Award,
  Users,
  Mail,
  MapPin,
  Phone,
  Globe,
  Twitter,
  Instagram,
  Facebook,
  Play,
  Star,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          
          <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-2xl">About</span>
            <span className="text-violet-500 font-bold text-3xl">RC</span>
            <span className=" text-white font-bold text-2xl">MOVIES</span>
          </Link>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
            Your ultimate destination for movies and TV shows streaming
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Film className="mr-3 text-[#4815ff]" />
                Our Story
              </h2>
              <p className="text-gray-300 mb-4">
                Founded in 2025, RCMOVIES was born from a passion for bringing quality entertainment to viewers around
                the world. What started as a small streaming service has grown into a platform loved by millions.
              </p>
              <p className="text-gray-300 mb-4">
                Our journey began with a simple idea: create a streaming platform that puts the viewer first. Today, we
                offer thousands of movies and TV shows across every genre imaginable, from blockbuster hits to indie
                gems.
              </p>
              <p className="text-gray-300">
                With our dedicated team of entertainment enthusiasts, we continue to innovate and expand our library to
                bring you the content you love.
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-video rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=720&width=1280" alt="Our story" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#4815ff] rounded-full p-4 cursor-pointer hover:bg-[#5a30ff] transition-colors">
                  <Play size={32} className="fill-white text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Tv className="mr-3 text-[#4815ff]" />
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors">
              <div className="bg-[#4815ff]/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Film className="text-[#4815ff]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Extensive Library</h3>
              <p className="text-gray-400">
                Access thousands of movies and TV shows, from classics to the latest releases, all in one place.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors">
              <div className="bg-[#4815ff]/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Star className="text-[#4815ff] fill-[#4815ff]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-400">
                Enjoy crystal-clear HD and 4K streaming with Dolby Atmos sound for an immersive experience.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-colors">
              <div className="bg-[#4815ff]/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Globe className="text-[#4815ff]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Access</h3>
              <p className="text-gray-400">
                Watch from anywhere in the world, on any device, with our seamless cross-platform experience.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Award className="mr-3 text-[#4815ff]" />
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Quality Content</h3>
              <p className="text-gray-300">
                We believe in curating the best content from around the world. Our team of experts carefully selects
                each title to ensure you have access to quality entertainment.
              </p>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">User Experience</h3>
              <p className="text-gray-300">
                Your viewing experience is our priority. We continuously improve our platform to make it faster, more
                intuitive, and tailored to your preferences.
              </p>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-300">
                We embrace new technologies and ideas to stay ahead of the curve. From recommendation algorithms to
                streaming quality, we're always pushing boundaries.
              </p>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-300">
                We value our community of viewers and creators. We actively listen to feedback and work with content
                creators to bring unique stories to our platform.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Users className="mr-3 text-[#4815ff]" />
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="bg-neutral-900 rounded-lg overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Sarah Johnson"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                <p className="text-[#4815ff] mb-2">CEO & Founder</p>
                <p className="text-gray-400 text-sm">Film enthusiast with 15+ years in the entertainment industry.</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-neutral-900 rounded-lg overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Michael Chen"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Michael Chen</h3>
                <p className="text-[#4815ff] mb-2">CTO</p>
                <p className="text-gray-400 text-sm">Tech innovator specializing in streaming technologies.</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-neutral-900 rounded-lg overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Elena Rodriguez"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Elena Rodriguez</h3>
                <p className="text-[#4815ff] mb-2">Content Director</p>
                <p className="text-gray-400 text-sm">Former film producer with an eye for compelling stories.</p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-neutral-900 rounded-lg overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="David Kim"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">David Kim</h3>
                <p className="text-[#4815ff] mb-2">UX Director</p>
                <p className="text-gray-400 text-sm">Design expert focused on creating intuitive user experiences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Mail className="mr-3 text-[#4815ff]" />
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-900 rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-[#4815ff] mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className="text-gray-400">123 Streaming Avenue, Los Angeles, CA 90001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-[#4815ff] mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-400">contact@streamflix.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-[#4815ff] mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <Link href="#" className="bg-neutral-800 p-3 rounded-full hover:bg-[#4815ff] transition-colors">
                    <Twitter size={20} />
                  </Link>
                  <Link href="#" className="bg-neutral-800 p-3 rounded-full hover:bg-[#4815ff] transition-colors">
                    <Instagram size={20} />
                  </Link>
                  <Link href="#" className="bg-neutral-800 p-3 rounded-full hover:bg-[#4815ff] transition-colors">
                    <Facebook size={20} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-lg p-8">
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-neutral-800 border-none rounded-md p-3 text-white focus:ring-2 focus:ring-[#4815ff] focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-neutral-800 border-none rounded-md p-3 text-white focus:ring-2 focus:ring-[#4815ff] focus:outline-none"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-neutral-800 border-none rounded-md p-3 text-white focus:ring-2 focus:ring-[#4815ff] focus:outline-none"
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-neutral-800 border-none rounded-md p-3 text-white focus:ring-2 focus:ring-[#4815ff] focus:outline-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4815ff] hover:bg-[#5a30ff] text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

