import Navbar from "@/pages/home/components/navbar"
import { useParams } from "react-router-dom"

const FirDetailsPage = () => {
    const { id } = useParams()
    return (
        <div className="pg max-h-screen overflow-hidden">
            <Navbar />
            <div className="flex max-h-screen mt-16 overflow-hidden">


                <main className="flex-grow overflow-hidden">
                    <div className="max-h-screen overflow-y-auto">
                        {id}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default FirDetailsPage