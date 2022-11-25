import noTransaction from 'assets/icons/no-transaction.svg'


const NoTransaction = () => {
  return (
    <div className='flex flex-col items-center text-center mt-10'>
        <img src={noTransaction} alt="" />
        <p className="matter-regular text-base leading-6 text-[#5B616E] mt-4">You have not performed any transaction</p>
    </div>
  )
}
export default NoTransaction