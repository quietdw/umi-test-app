export const list = () => {
  return new Promise(resolve => {
    let data = localStorage.getItem('list')
      ? JSON.parse(localStorage.getItem('list') as string)
      : [];
    setTimeout(() => {
      resolve(data);
      return data;
    }, 500);
  });
};

export const save = (params: any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem('list', JSON.stringify(params.list));

      resolve();
      return;
    }, 500);
  });
};
