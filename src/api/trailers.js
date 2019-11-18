import axiosInstance from "./index";

export function getTrailers() {
  return axiosInstance({
    url: "/getData?cmd=GETTRAILERS&mtype=cs",
    method: "get"
  });
}
