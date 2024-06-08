
type DataCardProps = {
    title: string,
    value: string | number,
    change_percentage?: string | number,
    change_label?: string
}
const DataCard: React.FC<DataCardProps> = ({
    title,
    value,
    change_percentage,
    change_label
}) => {
    return (
        <div className="p-3 hover:scale-[1.02] transition-all duration-400 rounded-md bg-white cursor-pointer border border-gray-200" >

            <p className="text-[0.95rem] text-gray-500">
                {title}
            </p>


            <p className="text-3xl p-4  font-bold">
                {value}
            </p>
            {
                change_percentage && (
                    <div className="flex gap-2 items-center">
                        <span className="py-1 px-2  rounded-3xl text-green-700 bg-green-200">
                            {change_percentage}
                        </span>
                        <p className="text-[0.75rem] font-semibold text-gray-500">
                            {change_label ?? 'compared to last month'}
                        </p>
                    </div>
                )
            }

        </div>
    )
}

export default DataCard;