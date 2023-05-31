import axios from 'axios';
import conf from "../assets/config/general.json";


export async function validateToken(token: string) {
  try {
    const res = await axios.get(conf.BASE_URL + 'auth/validatoken?token='+token)
    return res.data.success
  } catch (error) {
    return false
  }
}