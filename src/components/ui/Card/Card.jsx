import './Card.css'

export function Card({children, className }) {
  return <div className={`cardStyle ${className}`}>{children}</div>
}
export default Card