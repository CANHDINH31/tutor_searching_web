import axios from "axios";

const apiUrl = "http://localhost:8080/api/";

// FILE API
export const multipleFilesUpload = async (data, options) => {
  try {
    await axios.post(apiUrl + "multipleFiles", data, options);
  } catch (error) {
    throw error;
  }
};
export const getMultipleFiles = async () => {
  try {
    const { data } = await axios.get(apiUrl + "getMultipleFiles");
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteFiles = async (data) => {
  try {
    await axios.post(apiUrl + "deleteFiles", data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const scanFiles = async (data) => {
  try {
    const res = await axios.post(apiUrl + "scanFiles", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const scanMultiFile = async (data) => {
  try {
    const res = await axios.post(apiUrl + "scanMultiFile", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// REPORT API
export const createReport = async (data) => {
  try {
    const res = await axios.post(apiUrl + "detact-malware", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReports = async (data) => {
  try {
    const res = await axios.post(apiUrl + "delete-report", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getReport = async () => {
  try {
    const res = await axios.get(apiUrl + "get-report");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailReport = async (id) => {
  try {
    const res = await axios.get(apiUrl + "get-detail-report/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getReportStatistic = async () => {
  try {
    const res = await axios.get(apiUrl + "report-statistic");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// AUTHENTICATION API
export const signIn = async (data) => {
  try {
    const res = await axios.post(apiUrl + "sign-in", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(apiUrl + "login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
