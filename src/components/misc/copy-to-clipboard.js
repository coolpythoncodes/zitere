import { ClipboardIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast";

const CopyToClipboard = ({ text }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        toast.success('Account details copied successfully')
    }
    return (
        <ClipboardIcon onClick={copyToClipboard} className="h-4 w-4 cursor-pointer" />
    )
}

export default CopyToClipboard