import { api } from '../../utils/network';

type ArgsTypes = {
  blob: any;
  url: string;
  onProgress?: (val: number) => void;
};

const upload = ({ blob, url, onProgress }: ArgsTypes): Promise<any> => {
  const data = new FormData();
  data.append('file', blob, blob.name);

  const promise = new Promise((resolve, reject) => {
    api
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (onProgress) {
            onProgress(Math.round(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          }
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
  return promise;
};

export default upload;
