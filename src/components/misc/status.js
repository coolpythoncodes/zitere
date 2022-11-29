
const Status = ({ status }) => {
    return (
      <div className={`flex items-center justify-center w-[80px] text-xs h-7 rounded-lg capitalize ${status?.toLowerCase() === 'initiated' ? 'initiated' : status?.toLowerCase() === 'accepted' ? 'accepted' : status?.toLowerCase() === 'completed' ? 'completed' : status?.toLowerCase() === 'fulfilled' ? 'fulfilled' : status?.toLowerCase() === "cancelled" ? "cancelled" : "dispute"} `}>{status}</div>
    )
  }
  
  export default Status