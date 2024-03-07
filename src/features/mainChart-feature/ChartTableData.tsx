import type {ProColumns} from '@ant-design/pro-components';
import {
    EditableProTable,
    ProCard,
    ProFormField,
    useRefFunction,
} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {queryByUser} from "./api/ChartTableDataApi";
import {Button} from "antd";

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

type DataSourceType = {
    id?: React.Key;
    index?: number;
    xField?: string;
    yField?: string;
    type?: string;
    children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [];

const loopDataSourceFilter = (
    data: readonly DataSourceType[],
    id: React.Key | undefined,
): DataSourceType[] => {
    return data
        .map((item) => {
            if (item.id !== id) {
                if (item.children) {
                    const newChildren = loopDataSourceFilter(item.children, id);
                    return {
                        ...item,
                        children: newChildren.length > 0 ? newChildren : undefined,
                    };
                }
                return item;
            }
            return null;
        })
        .filter(Boolean) as DataSourceType[];
};

export const ChartTableData: React.FC = () => {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(() => defaultData,);

    const removeRow = useRefFunction((record: DataSourceType) => {
        setDataSource(loopDataSourceFilter(dataSource, record.id));
    });


    useEffect(() => {
        queryByUser(setDataSource, {userPin: 'demo'});
    }, []);

    const columns: ProColumns<DataSourceType>[] = [

        {
            title: 'yField',
            dataIndex: 'yField'
        },
        {
            title: 'type',
            dataIndex: 'dataType',
        },
        {
            title: 'xField',
            key: 'xField',
            dataIndex: 'xField'
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record, _, action) => [
                <a key="delete" onClick={() => {removeRow(record);}}>删除</a>,
                <a key="editable" onClick={() => { // @ts-ignore
                    action?.startEditable?.(record.id);}}>编辑</a>,
                <a key="save" onClick={() => {removeRow(record);}}>保存</a>,
                <a key="addRow" onClick={() => {
                    let idx = dataSource.length; // 初始化为最后一行
                    dataSource.forEach(({ id }, i) => {
                        if (id === record.id) {
                            idx = i + 1; // 查找新增行开始位置
                        }
                    });
                    const newIndex = idx + 1;
                    const newRow = { id: Date.now().toString(), index: newIndex };
                    // @ts-ignore
                    dataSource?.splice(idx, 0, newRow);
                    setDataSource([...dataSource]);
                    // setEditableRowKeys(dataSource.map(({ id }) => id));

                }}>添加一行</a>,
            ],
        },
    ];

    return (
        <>
            <EditableProTable<DataSourceType>
                expandable={{
                    // 使用 request 请求数据时无效
                    // defaultExpandAllRows: true,
                }}
                scroll={{
                    x: 960,
                }}
                rowKey="id"
                headerTitle="图表数据"
                // maxLength={5}
                recordCreatorProps={{
                    position: 'bottom',
                    newRecordType: 'dataSource',
                    // parentKey: () => 624748504,
                    record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                }}
                columns={columns}
                value={dataSource}
                onChange={setDataSource}
                toolBarRender={() => {
                    return [
                        <Button
                            type="primary"
                            key="save"
                            onClick={() => {
                                // dataSource 就是当前数据，可以调用 api 将其保存
                                console.log(dataSource);
                            }}
                        >
                            保存数据
                        </Button>,
                    ];
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    actionRender: (row, config, defaultDoms) => {
                        return [defaultDoms.delete, defaultDoms.save, defaultDoms.cancel];
                    },
                    onValuesChange: (record, recordList) => {
                        setDataSource(recordList);
                    },
                    onChange: setEditableRowKeys,
                    // onSave: async (rowKey, data, row) => {
                    //     console.log(rowKey, data, row);
                    //     await waitTime(2000);
                    // },
                    // onChange: setEditableRowKeys,
                }}
            />
            <ProCard style={{textAlign: 'left'}} title="表格数据" headerBordered collapsible defaultCollapsed>
                <ProFormField
                    ignoreFormItem
                    fieldProps={{
                        style: {
                            width: '100%',
                        },
                    }}
                    mode="read"
                    valueType="jsonCode"
                    text={JSON.stringify(dataSource)}
                />
            </ProCard>
        </>
    );
};
