import React, { KeyboardEvent, ChangeEvent, useState, useEffect } from 'react';
import { Button, Input, List, Space } from 'antd';
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';
import index from './index.less';
import { router } from 'umi';
import { connect } from 'dva';
interface Todoitem {
  value: string;
  todoStatus: boolean;
  editStatus?: boolean;
}

interface listProps {
  list: Todoitem[];
  loading: boolean;
  dispatch: Function;
}
const Todo = ({ dispatch, list, loading }: listProps) => {
  const [todo, setTodo] = useState('');
  const [temp, setTemp] = useState('');
  let newList = list;

  async function getList() {
    await dispatch({
      type: 'todo/list',
    });
  }
  useEffect(() => {
    getList();
  }, []);

  async function handleAddTodo(e: KeyboardEvent<HTMLInputElement>) {
    let item: Todoitem = {
      value: '',
      todoStatus: false,
      editStatus: false,
    };
    item.value = e.currentTarget.value;
    dispatch({
      type: 'todo/add',
      payload: {
        item,
      },
    });
    setTodo('');
    await dispatch({
      type: 'todo/save',
      payload: {
        list,
      },
    });
  }

  async function handleEditTodo(index: any, item: Todoitem) {
    dispatch({
      type: 'todo/edit',
      payload: {
        index,
        item,
      },
    });
    setTemp('');
    await dispatch({
      type: 'todo/save',
      payload: {
        list,
      },
    });
  }

  async function handleDeleteTodo(index: any) {
    dispatch({
      type: 'todo/delete',
      payload: {
        index,
      },
    });
    await dispatch({
      type: 'todo/save',
      payload: {
        list,
      },
    });
  }

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <div className={index.wrapper}>
      <h3>本地备忘录</h3>

      <List
        loading={loading}
        header={
          <Input
            onPressEnter={e => handleAddTodo(e)}
            placeholder="添加备忘"
            onChange={e => {
              setTodo(e.currentTarget.value);
            }}
            value={todo}
          ></Input>
        }
        bordered
        dataSource={newList}
        renderItem={(item, k) => (
          <List.Item
            actions={
              item.editStatus
                ? [
                    <Button
                      onClick={() => {
                        handleEditTodo(k, {
                          ...Object.assign(item, {
                            value: temp,
                            editStatus: false,
                          }),
                        });
                      }}
                      type="link"
                    >
                      确定修改
                    </Button>,
                    <Button
                      onClick={() => {
                        Object.assign(item, { editStatus: false });
                      }}
                      type="link"
                    >
                      取消
                    </Button>,
                  ]
                : item.todoStatus
                ? [
                    <Button
                      type="link"
                      onClick={() => {
                        handleDeleteTodo(k);
                      }}
                    >
                      删除
                    </Button>,
                  ]
                : [
                    <Button
                      type="link"
                      onClick={() => {
                        Object.assign(item, { editStatus: true });
                        setTemp(item.value);
                      }}
                    >
                      编辑
                    </Button>,
                    <Button
                      type="link"
                      onClick={() => {
                        handleEditTodo(k, {
                          ...Object.assign(item, { todoStatus: true }),
                        });
                      }}
                    >
                      完成
                    </Button>,
                    <Button
                      type="link"
                      onClick={() => {
                        handleDeleteTodo(k);
                      }}
                    >
                      删除
                    </Button>,
                  ]
            }
          >
            {item.editStatus ? (
              <Input
                value={temp}
                onChange={e => {
                  setTemp(e.currentTarget.value);
                }}
                onPressEnter={e =>
                  handleEditTodo(k, {
                    ...Object.assign(item, {
                      value: e.currentTarget.value,
                      editStatus: false,
                    }),
                  })
                }
              ></Input>
            ) : (
              <span className={item.todoStatus ? index.done : ''}>{item.value}</span>
            )}
          </List.Item>
        )}
        footer={
          <div>
            <Space size="large">
              <IconText
                icon={CheckOutlined}
                text={`已完成：${list.filter(v => v.todoStatus).length}`}
              ></IconText>
              <IconText
                icon={HighlightOutlined}
                text={`进行中：${list.filter(v => !v.todoStatus).length}`}
              ></IconText>
            </Space>
          </div>
        }
      />
      <p
        onClick={() => {
          router.push('/test');
        }}
      >
        去测试
      </p>
    </div>
  );
};

export default connect(({ todo, loading }: any) => ({
  list: todo.list,
  loading: loading.global,
}))(Todo);
