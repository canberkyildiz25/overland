import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

const api = axios.create({ baseURL: BASE_URL });

export async function fetchCampers(params = {}) {
  const { data } = await api.get('/campers', { params });
  // API { total, items } formatında döner
  return Array.isArray(data) ? data : (data.items ?? []);
}

export async function fetchCamperById(id) {
  const { data } = await api.get(`/campers/${id}`);
  return data;
}
