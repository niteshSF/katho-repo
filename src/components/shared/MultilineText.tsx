const MultilineText = ({ text, gap = 1 }: { text: string; gap?: number }) => {
  return (
    <div className={`flex flex-col`} style={{ gap: `${gap}px` }}>
      {text.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  )
}

export default MultilineText
