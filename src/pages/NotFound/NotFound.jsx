import { Link } from "react-router-dom";
import {Card} from "../../components/ui/Card/Card"
import Planet from "../../components/Planet/Planet";
import './NotFound.css'
function NotFound() {
  return (
    <div className="Container-notfound">
      <Planet/>
      <Card className={"card-notfound cardStyle2"}>
        <h1>Page Not Found</h1>
        <h3 className="style-error">404</h3>
        <Link to="/">Go back to home</Link>
      </Card>
      <div className="svg-container">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="svg">
          <path d="M-7.62,147.52 C123.87,-50.82 392.49,-59.70 531.32,181.08 L527.37,207.72 L-62.36,199.83 Z" className="svg-path"></path>
        </svg>
      </div>
    </div>
  )
}
export default NotFound