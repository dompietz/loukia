import './Loading.css'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = "Loukia Hadjiyianni" }: LoadingProps) {
  return (
    <div className="loading-screen" role="status" aria-busy="true" aria-label="Loading content">
      <div className="loading-screen__content">
        <span className="loading-screen__name">{message}</span>
        <div className="loading-screen__line-container">
          <div className="loading-screen__line" />
        </div>
      </div>
    </div>
  )
}
