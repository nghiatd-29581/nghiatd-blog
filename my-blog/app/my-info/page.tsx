// app/about/page.tsx

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white">
      {/* Terminal-like Header */}
      <div className="max-w-4xl mx-auto pt-12 px-8">
        <div className="bg-black/50 backdrop-blur-md rounded-lg border border-cyan-500/30 shadow-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-cyan-400 font-mono">root@nghia:~#</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Nghĩa, Trần Đắc
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12 text-pink-300 font-semibold">
            Rust từ C# bay sang
          </p>

          {/* About Section */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg leading-relaxed text-gray-200">
              Xin chào! Mình là Nghĩa – một lập trình viên đam mê khám phá các ngôn ngữ mới.
              Bắt đầu hành trình từ C#, mình đã "bay sang" Rust vì sự an toàn và hiệu suất tuyệt vời của nó,
              đồng thời cũng rất thích Python vì sự đơn giản và mạnh mẽ trong automation/scripting.
            </p>
            <p className="text-lg leading-relaxed text-gray-200 mt-4">
              Blog này là nơi mình ghi lại hành trình học tập, chia sẻ kiến thức từ cơ bản đến nâng cao
              về Rust và Python – dành cho những ai cũng đang chuyển hướng như mình.
              Hy vọng các bài viết sẽ hữu ích cho bạn!
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-orange-600/20 to-pink-600/20 rounded-xl p-6 border border-orange-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-orange-300">Kỹ Năng Chính</h3>
              <ul className="space-y-2 text-gray-200">
                <li>• Rust • Ownership • Async • Cargo</li>
                <li>• Python • Automation • Data Processing</li>
                <li>• C# • .NET • Java • Backend Development</li>
                <li>• Next.js • Tailwind • Vercel</li>
                <li>• Microservices • openShift • SQL • noSQL</li>
                <li>• SQL • noSQL</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 rounded-xl p-6 border border-cyan-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-cyan-300">Liên Kết</h3>
              <p className="text-gray-200 mb-4">
                Kết nối với mình trên LinkedIn để trao đổi thêm:
              </p>
              <Link
                href="https://www.linkedin.com/in/ngh%C4%A9a-tr%E1%BA%A7n-%C4%91%E1%BA%AFc-b0394628b/"
                target="_blank"
                className="inline-block px-6 py-3 bg-cyan-500/80 hover:bg-cyan-400 transition rounded-lg font-semibold text-black"
              >
                LinkedIn Profile ↗
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400 border-t border-gray-700/50 pt-6">
            Built with Next.js • Tailwind{" "}
            <span className="text-red-500">❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
}