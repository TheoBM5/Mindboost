import { Link } from "react-router-dom";
import {Card} from "../components/ui/Card/Card"
function NotFound() {
  return (
    <div>
      <Card>
        <h1>Page Not Found</h1>
        <h3>404</h3>
        <Link to="/">Go back to home</Link>
      </Card>
    </div>
  )
}
export default NotFound