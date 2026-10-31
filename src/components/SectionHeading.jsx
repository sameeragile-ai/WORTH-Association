export default function SectionHeading({
  kicker,
  title,
  italicWord,
  titleSuffix,
  subtitle,
  align = 'left',
  className = '',
  light = false,
}) {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : align === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-3xl ${alignmentClass} ${className} mb-10 sm:mb-14`}>
      {kicker && (
        <span
          className={`text-xs uppercase tracking-[0.22em] font-semibold mb-3 ${
            light ? 'text-[#E8907E]' : 'text-[#9C1F5A]'
          }`}
        >
          {kicker}
        </span>
      )}

      <h2
        className={`font-jost text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] ${
          light ? 'text-white' : 'text-[#1F1A1C]'
        }`}
        style={{ textWrap: 'balance' }}
      >
        {title}{' '}
        {italicWord && (
          <span className="font-fraunces italic font-normal text-gradient">
            {italicWord}
          </span>
        )}{' '}
        {titleSuffix}
      </h2>

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed mt-4 ${
            light ? 'text-[#FDF7F4]/80' : 'text-[#6B5E62]'
          } max-w-2xl`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
