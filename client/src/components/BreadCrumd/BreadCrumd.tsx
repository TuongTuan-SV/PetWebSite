import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BreadCrumd(){
    const location = useLocation()

    let currentlink:any = ''

    const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !='')
    .map(crumb =>{
        currentlink=+`/${crumb}`
        return(
            <div className="crumb" key = {crumb}>
                <Link to ={currentlink}>{crumb} </Link>
            </div>
        )
    })
    return(
        <div className="BreadCrumd">
            {crumbs}
        </div>
    )
}