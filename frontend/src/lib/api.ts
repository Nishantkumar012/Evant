import axios from 'axios';
import { Requirement } from '@/types/requirement';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createRequirement = async (data: any): Promise<Requirement> => {
  const response = await apiClient.post('/requirements', data);
  return response.data.data;
};

export const getRequirements = async (params?: {
  category?: string;
  status?: string;
  limit?: number;
  page?: number;
}): Promise<{ data: Requirement[]; pagination: any }> => {
  const response = await apiClient.get('/requirements', { params });
  return response.data;
};

export const getRequirementById = async (id: string): Promise<Requirement> => {
  const response = await apiClient.get(`/requirements/${id}`);
  return response.data.data;
};

export const updateRequirement = async (id: string, data: Partial<Requirement>): Promise<Requirement> => {
  const response = await apiClient.patch(`/requirements/${id}`, data);
  return response.data.data;
};

export const deleteRequirement = async (id: string): Promise<void> => {
  await apiClient.delete(`/requirements/${id}`);
};
