import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="mt-4 flex justify-center md:mt-0">
            <div className="flex space-x-6 md:order-2">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link href="/twitch" className="text-sm text-gray-500 hover:text-gray-900">
                トップストリーマー
              </Link>
              <Link href="/twitch/page" className="text-sm text-gray-500 hover:text-gray-900">
                ゲーム別トップクリップ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

