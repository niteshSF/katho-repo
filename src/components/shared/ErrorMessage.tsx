const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div>
      <p className="text-center text-lg text-red-400 font-bold">{error}</p>
    </div>
  )
}

export default ErrorMessage
