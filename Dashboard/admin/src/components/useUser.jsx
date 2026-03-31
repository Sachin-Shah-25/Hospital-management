
import  {useQuery}  from '@tanstack/react-query'
import axios from 'axios'
function useUser() {
    console.log("hi")
   return useQuery({
        queryKey: ["search","login"],
        queryFn: async function () {
            console.log("O")
            const data = await axios.get("http://localhost:5000/myadminid", { withCredentials: true })
            console.log(data)
            return data?.data
        }
    })
   
}
export default useUser