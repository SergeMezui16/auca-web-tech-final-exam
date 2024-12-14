import Spinner from "@/components/ui/spinner.jsx";

export const LoadingBlock = ({message}) => {
  return (<div className="w-full h-80 flex flex-col items-center justify-center gap-2">
    <Spinner size="lg" />
    {message ?? "Loading..."}
  </div>)
}