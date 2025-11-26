// components/AnimatedBackground.tsx – PHIÊN BẢN MƯỢT NHẤT
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      {/* Chỉ giữ 2 quả cầu mờ, không animate gì thêm */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
    </div>
  );
}