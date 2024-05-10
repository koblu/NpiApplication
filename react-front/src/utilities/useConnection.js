import axios from "axios";
import { useCookies } from "react-cookie";

export function useConnection() {

  const [cookies] = useCookies();
  const conn = axios.create({
    baseURL:'http://127.0.0.1:8000',
    timeout: 1000

  });

  return {
    search: 
    (searchObj) => {
        const data = conn.post('/api/search', searchObj)
        .then((response) => 
          response?.data
        )
        .catch((error) => {
          console.error(error);
        });

        return data;
    },
    details:
    (npiNo) => {
      const data = conn.get('/api/details/'+npiNo)
      .then((response) => 
        response?.data
      )
      .catch((error) => {
        console.error(error);
      });

      return data;
    }
  }
}
  