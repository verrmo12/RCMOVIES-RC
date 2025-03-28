import type React from "react"

import { motion } from "framer-motion"
import { Shield, Lock, FileText, Cookie, Copyright, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import Layout from "../components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

const PolicySection = ({
  title,
  icon,
  children,
}: { title: string; icon: React.ReactNode; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-8 bg-[rgb(22,22,22)] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left bg-[rgb(25,25,25)] hover:bg-[rgb(30,30,30)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-violet-700/20 w-10 h-10 rounded-lg flex items-center justify-center">{icon}</div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

export default function PolicyPage() {
  return (
    <Layout title="Policies">
      {/* Hero Section */}
      <div
        className="relative w-full h-[30vh] md:h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgb(17,17,17)), url(https://image.tmdb.org/t/p/original//8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg)`,
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,17,17,0.7)] via-[rgba(17,17,17,0.4)] to-[rgb(17,17,17)]"></div>

        <div className="w-full h-full flex flex-col justify-center items-center relative z-10 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Our Policies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl"
          >
            Important information about how we operate and protect your data
          </motion.p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="bg-[rgb(17,17,17)] py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Legal Information</h2>
            <div className="relative">
              <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
            </div>
            <p className="text-gray-400 max-w-3xl">
              Please review our policies carefully. By using RCMOVIES, you agree to these terms and conditions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <PolicySection title="Privacy Policy" icon={<Lock className="text-violet-500" size={20} />}>
              <div className="text-gray-300 space-y-4">
                <h4 className="text-lg font-medium text-white">No Data Collection Policy</h4>
                <p>
                  RCMOVIES does not collect, store, or process any personal information from our users. We do not have
                  user accounts, login systems, or any server-side storage of user data.
                </p>

                <h4 className="text-lg font-medium text-white">Browser Storage</h4>
                <p>
                  Any preferences or settings you choose while using RCMOVIES are stored exclusively in your browser's
                  local storage or session storage. This data never leaves your device and is not accessible to us.
                </p>

                <h4 className="text-lg font-medium text-white">Third-Party APIs</h4>
                <p>
                  RCMOVIES uses The Movie Database (TMDB) API to provide movie and TV show information. We do not share
                  any user information with these services because we do not collect any.
                </p>

                <h4 className="text-lg font-medium text-white">Analytics</h4>
                <p>
                  We may use anonymized analytics tools to understand general usage patterns of our website. These tools
                  do not identify individual users and do not track personal information.
                </p>

                <h4 className="text-lg font-medium text-white">Your Privacy</h4>
                <p>
                  Since we don't collect your data, you maintain complete control over your privacy while using
                  RCMOVIES. You can clear your browser's local storage at any time to remove any saved preferences.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Terms of Service" icon={<FileText className="text-violet-500" size={20} />}>
              <div className="text-gray-300 space-y-4">
                <h4 className="text-lg font-medium text-white">Acceptance of Terms</h4>
                <p>
                  By accessing or using RCMOVIES, you agree to be bound by these Terms of Service. If you do not agree
                  to all the terms and conditions, you must not access or use our services.
                </p>

                <h4 className="text-lg font-medium text-white">No User Accounts</h4>
                <p>
                  RCMOVIES does not have user accounts or login systems. Any personalization features are handled
                  through your browser's local storage and are not tied to any personal identifiers.
                </p>

                <h4 className="text-lg font-medium text-white">Prohibited Activities</h4>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our service for any illegal purpose or in violation of any laws</li>
                  <li>Attempt to gain unauthorized access to any part of our service</li>
                  <li>Interfere with or disrupt the integrity or performance of our service</li>
                  <li>Collect or harvest any information from our service</li>
                  <li>Reproduce, duplicate, copy, sell, or resell any portion of our service</li>
                </ul>

                <h4 className="text-lg font-medium text-white">Termination</h4>
                <p>
                  We may terminate or suspend your account and access to our service immediately, without prior notice
                  or liability, for any reason, including if you breach these Terms of Service.
                </p>

                <h4 className="text-lg font-medium text-white">Changes to Terms</h4>
                <p>
                  We reserve the right to modify these terms at any time. We will provide notice of significant changes
                  by posting the new Terms of Service on this page and updating the "last updated" date.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Content Policy" icon={<Shield className="text-violet-500" size={20} />}>
              <div className="text-gray-300 space-y-4">
                <h4 className="text-lg font-medium text-white">Content Information</h4>
                <p>
                  RCMOVIES provides information about movies and TV shows, including ratings, reviews, and descriptions.
                  This content is sourced from The Movie Database (TMDB) API and other public sources.
                </p>

                <h4 className="text-lg font-medium text-white">No User-Generated Content</h4>
                <p>
                  Since RCMOVIES does not have user accounts or data storage systems, we do not host or store any
                  user-generated content such as reviews, ratings, or comments.
                </p>

                <h4 className="text-lg font-medium text-white">Content Accuracy</h4>
                <p>
                  While we strive to provide accurate information about movies and TV shows, all content is provided "as
                  is" from our data sources. We make no guarantees about the completeness or accuracy of this
                  information.
                </p>

                <h4 className="text-lg font-medium text-white">Content Updates</h4>
                <p>
                  Movie and TV show information is updated regularly through our API connections. However, there may be
                  delays between updates to external databases and when that information appears on RCMOVIES.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Cookie Policy" icon={<Cookie className="text-violet-500" size={20} />}>
              <div className="text-gray-300 space-y-4">
                <h4 className="text-lg font-medium text-white">Local Browser Storage</h4>
                <p>
                  Instead of traditional cookies, RCMOVIES primarily uses your browser's local storage and session
                  storage capabilities to remember your preferences and settings. This data is stored entirely on your
                  device and is not accessible to us.
                </p>

                <h4 className="text-lg font-medium text-white">How We Use Browser Storage</h4>
                <p>Browser storage is used to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your theme preferences</li>
                  <li>Save your watchlist locally on your device</li>
                  <li>Track your continue watching progress</li>
                  <li>Store temporary session information</li>
                </ul>

                <h4 className="text-lg font-medium text-white">No Cross-Site Tracking</h4>
                <p>
                  Since we don't use traditional tracking cookies, your browsing activity on RCMOVIES is not tracked
                  across other websites or services.
                </p>

                <h4 className="text-lg font-medium text-white">Managing Local Storage</h4>
                <p>
                  You can clear your browser's local storage at any time through your browser settings. This will reset
                  any saved preferences or watchlists on RCMOVIES.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Copyright & DMCA Policy" icon={<Copyright className="text-violet-500" size={20} />}>
              <div className="text-gray-300 space-y-4">
                <h4 className="text-lg font-medium text-white">Copyright Ownership</h4>
                <p>
                  All content provided on RCMOVIES, including but not limited to text, graphics, logos, icons, images,
                  audio clips, digital downloads, and data compilations, is the property of RCMOVIES or its content
                  suppliers and is protected by international copyright laws.
                </p>

                <h4 className="text-lg font-medium text-white">Fair Use</h4>
                <p>
                  We believe in fair use of copyrighted material for purposes such as criticism, comment, news
                  reporting, teaching, scholarship, or research. We provide information about movies and TV shows for
                  these purposes.
                </p>

                <h4 className="text-lg font-medium text-white">DMCA Compliance</h4>
                <p>
                  RCMOVIES respects the intellectual property rights of others and expects its users to do the same. In
                  accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to claims
                  of copyright infringement.
                </p>

                <h4 className="text-lg font-medium text-white">Reporting Copyright Infringement</h4>
                <p>
                  If you believe that your work has been copied in a way that constitutes copyright infringement, please
                  provide us with the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A physical or electronic signature of the copyright owner or authorized person</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing</li>
                  <li>Your contact information, including address, telephone number, and email</li>
                  <li>A statement that you have a good faith belief that the use is not authorized</li>
                  <li>
                    A statement that the information is accurate and, under penalty of perjury, that you are authorized
                    to act on behalf of the copyright owner
                  </li>
                </ul>

                <h4 className="text-lg font-medium text-white">Contact for Copyright Issues</h4>
                <p>
                  Please send copyright infringement notices to:{" "}
                  <a
                    href="mailto:copyright@rcmovies.com"
                    className="text-violet-500 hover:text-violet-400 transition-colors"
                  >
                    copyright@rcmovies.com
                  </a>
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Disclaimer" icon={<AlertCircle className="text-violet-500" size={20} />}>
              <div className="text-gray-300 space-y-4">
                <h4 className="text-lg font-medium text-white">No Hosting of Content</h4>
                <p>
                  RCMOVIES does not host, store, or distribute any movies, TV shows, or other media content. We provide
                  information about such content, including metadata, ratings, and reviews.
                </p>

                <h4 className="text-lg font-medium text-white">No User Data Storage</h4>
                <p>
                  RCMOVIES does not store any user data on our servers. Any personalization features, such as watchlists
                  or viewing history, are stored exclusively in your browser's local storage. We have no access to this
                  data, and it remains entirely on your device.
                </p>

                <h4 className="text-lg font-medium text-white">Third-Party Links</h4>
                <p>
                  Our website may contain links to third-party websites or services that are not owned or controlled by
                  RCMOVIES. We have no control over, and assume no responsibility for, the content, privacy policies, or
                  practices of any third-party websites or services.
                </p>

                <h4 className="text-lg font-medium text-white">Accuracy of Information</h4>
                <p>
                  While we strive to provide accurate and up-to-date information, we make no representations or
                  warranties of any kind, express or implied, about the completeness, accuracy, reliability,
                  suitability, or availability of the information contained on our website.
                </p>

                <h4 className="text-lg font-medium text-white">Limitation of Liability</h4>
                <p>
                  To the maximum extent permitted by applicable law, RCMOVIES shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                  incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </div>
            </PolicySection>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Last updated: March 21, 2025</p>
            <Link href="/about" className="text-violet-500 hover:text-violet-400 transition-colors">
              Learn more about RCMOVIES
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

