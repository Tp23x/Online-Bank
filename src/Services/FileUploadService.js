import api from "../components/api/api";

const upload = async (files) => {
  let formData = new FormData();
  for (const file of files) {
    await formData.append("file_upload", file);
  }
  const result = await api.post(`api/v1.0/setting/menu/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};

const uploadFileForBvoice = async (files) => {
  let _result = [];
  for (const file of files) {
    let formData = new FormData();

    await formData.append("file_upload", file);
    const result = await api.post(`api/v1.0/setting/menu/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(result);
    _result.push(result);
  }

  return _result;
};

const uploadExcel = async (files) => {
  let formData = new FormData();
  for (const file of files) {
    formData.append("file_upload", file);
  }
  const result = await api.post(`api/v1.0/setting/menu/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};

const uploadExcelCatagoly = async (files) => {
  console.log(files);
  let formData = new FormData();
  for (const file of files) {
    formData.append("menu", file);
  }
  const result = await api.post(`api/v1.0/setting/menu/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};

export default {
  upload,
  uploadFileForBvoice,
  uploadExcel,
  uploadExcelCatagoly,
};
