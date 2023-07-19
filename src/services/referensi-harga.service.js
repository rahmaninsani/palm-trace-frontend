import { Api } from "../config";

const getAll = async () => {
  return await Api.get("/referensi-harga");
};

export default { getAll };
