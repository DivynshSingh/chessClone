import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate();
    return <>
        <div>
            <div className="w-full px-6 py-4 bg-gray-800 shadow-md flex justify-between items-center">
                <div className="text-2xl font-bold text-green-400">
                    ♟️ ChessZone 
                </div>
                <div className="hidden md:flex space-x-4 text-sm">
                    <a href="#about" className="text-xl text-green-300 transition">About</a>
                    <a href="#features" className="text-xl text-green-300 transition">Features</a>
                    <a href="#contact" className="text-xl text-green-300 transition">Contact</a>
                </div>
            </div>

            
            <div className="pt-[7vh] md:pt-[25vh]">
               
                <div className="grid grid-cols-1 gap-4
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