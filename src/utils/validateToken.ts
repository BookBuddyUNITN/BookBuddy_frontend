import axios from 'axios';

export async function validateToken(token: string) {
  try {
    const res = await axios.get('http://localhost:3456/auth/validatoken?token='+token)
    return res.data.success
  } catch (error) {
    return false
  }
}