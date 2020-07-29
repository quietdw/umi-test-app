import React, { useContext } from 'react';
import { router } from 'umi';

export default () => {
  const AppContext = React.createContext({ username: '' });

  const Comp1 = () => {
    const { username } = useContext(AppContext);
    return (
      <div>
        1：
        <p>{username}</p>
      </div>
    );
  };
  const Comp2 = () => {
    const { username } = useContext(AppContext);
    return (
      <div>
        2:
        <p>{username}</p>
      </div>
    );
  };

  return (
    <AppContext.Provider value={{ username: '111' }}>
      <div className="App">
        <span
          onClick={() => {
            router.push('/todo');
          }}
        >
          开始todo
        </span>

        <Comp1></Comp1>
        <Comp2></Comp2>
      </div>
    </AppContext.Provider>
  );
};
