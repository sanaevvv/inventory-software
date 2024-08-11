export const FormWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 space-y-10">
      {children}
     </div>
  )
}
