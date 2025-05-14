export const Button = ({onClick, children} : {onClick: ()=>void, children: React.ReactNode }) => {
    return <button onClick={onClick} className="flex items-center justify-center w-full bg-green-700 hover:shadow-[rgba(74,222,127,0.2)_0px_0px_10px_10px] hover:bg-green-500 text-white text-xl font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200">
            <div className="text-2xl font-bold">
                {children}
            </div>
        </button>
}