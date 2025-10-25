import { jwtDecode } from "jwt-decode";

 

export default function getUserId() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded?.id || decoded?._id || null;
  }
  return null;
}
