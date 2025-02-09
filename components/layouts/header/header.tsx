import Link from "next/link"
import logo from "@/public/img/logo.jpg"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                <Image src={logo} alt="logo" width={40} height={40} />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Home
              </Link>
              <Link
                href="/twitch"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                トップストリーマー
              </Link>
              <Link
                href="/twitch/page"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                ゲーム別トップクリップ
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}