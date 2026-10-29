export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex-none rounded-[7px] bg-accent"
        style={{ width: size, height: size }}
      />
      <span className="text-[17px] font-bold tracking-tight text-ink">ایجنت‌ورس</span>
    </div>
  );
}
