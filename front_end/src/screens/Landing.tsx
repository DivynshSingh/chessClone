import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate();
    return <>
        <div>
            <div className="pt-10">
               
                <div className="max-h-[30vh] grid grid-cols-1 gap-4
                     md:grid-cols-2">
                    
                    <div className="flex justify-center">
                        <img src="/chess.png" alt="chessBoard" className="w-1/2 aspect-square rounded-2xl" />
                    </div>

                    <div className="p-20">
                        
                        <h1 className="text-4xl font-bold text-gray-400" >Play Chess Online on the #2 Site!</h1>
                        
                        <div className="mt-4 flex items-center justify-center">
                            
                            <Button onClick={()=>{ navigate("/game"); }}> Play Online </Button>

                        </div>
                    
                    </div>

                </div>

            </div>
        </div>
    </>
}