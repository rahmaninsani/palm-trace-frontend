import { api } from "../config";

const create = async (payload) => {
  const result = await api.post(`/kontrak/${payload.idKontrak}/delivery-order`, payload.data);
  return result.data;
};

const confirm = async (payload) => {
  const result = await api.put(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}`, payload.data);
  return result.data;
};

const findAll = async (payload) => {
  const result = await api.get(`/kontrak/${payload.idKontrak}/delivery-order`);
  return result.data;
};

const findOne = async (payload) => {
  const result = await api.get(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}`);
  return result.data;
};

const findAllByUser = async () => {
  const result = await api.get(`/delivery-order`);
  return result.data;
};

const deliveryOrderService = {
  create,
  confirm,
  findAll,
  findOne,
  findAllByUser,
};

export default deliveryOrderService;
