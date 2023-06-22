import axios from 'axios';
import queryString from 'query-string';
import { ElderlyUserProfileInterface, ElderlyUserProfileGetQueryInterface } from 'interfaces/elderly-user-profile';
import { GetQueryInterface } from '../../interfaces';

export const getElderlyUserProfiles = async (query?: ElderlyUserProfileGetQueryInterface) => {
  const response = await axios.get(`/api/elderly-user-profiles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createElderlyUserProfile = async (elderlyUserProfile: ElderlyUserProfileInterface) => {
  const response = await axios.post('/api/elderly-user-profiles', elderlyUserProfile);
  return response.data;
};

export const updateElderlyUserProfileById = async (id: string, elderlyUserProfile: ElderlyUserProfileInterface) => {
  const response = await axios.put(`/api/elderly-user-profiles/${id}`, elderlyUserProfile);
  return response.data;
};

export const getElderlyUserProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/elderly-user-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteElderlyUserProfileById = async (id: string) => {
  const response = await axios.delete(`/api/elderly-user-profiles/${id}`);
  return response.data;
};
