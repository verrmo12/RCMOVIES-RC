import { Github, Twitter, Instagram, Youtube, Coffee } from "lucide-react"
import Link from "next/link"

function Footer() {
  return (
    <footer className="bg-[rgb(17,17,17)] p-4 md:px-8 md:py-10 relative mt-12">
      <div className="container mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-violet-500 font-bold text-3xl">RC</span>
            <span className=" text-white font-bold text-2xl">MOVIES</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-400 sm:mb-0 gap-6">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies/1" className="hover:text-white transition-colors">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/tvshows/1" className="hover:text-white transition-colors">
                TV Shows
              </Link>
            </li>
            <li>
              <Link href="/topimdb/1" className="hover:text-white transition-colors">
                Top Rated
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link href="/policy" className="hover:text-white transition-colors">
                Our Policy
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        <div className="bg-[rgb(10,10,10)] p-4 rounded-lg mb-6 text-gray-500 text-sm">
          <p>
            Note: All content on this site is for informational purposes only. RCMOVIES does not store any files on its
            server. All content is provided by non-affiliated third parties.
          </p>
        </div>

        {/* Support Development Team Section */}
        <div className="bg-violet-700/10 p-4 rounded-lg mb-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-violet-400">
              <Coffee size={24} className="animate-pulse" />
              <span className="font-medium">Support Development Team</span>
            </div>
            <p className="text-gray-300 text-sm">
              If you enjoy using RCMOVIES, please consider supporting our development team.
            </p>
            <Link
              href="https://www.buymeacoffee.com/reconn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFDD00] text-[#000000] px-4 py-2 rounded-md font-medium text-sm hover:bg-[#FFDD00]/90 transition-colors flex items-center gap-2"
            >
              <Coffee size={16} />
              <span>Buy me a coffee</span>
            </Link>
          </div>
        </div>

        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-gray-400">
            <span className="block mb-2 sm:mb-0">
              © 2025{" "}
              <Link href="#" className="hover:text-white">
                RCMOVIES
              </Link>
              . All Rights Reserved.
            </span>
            <small className="text-gray-500">Made by Recon</small>
          </div>

          <div className="flex space-x-5 mt-4 sm:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={20} />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

