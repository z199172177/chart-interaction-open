import React, {useEffect, useState} from 'react';
import {Bar} from '@ant-design/plots';
import {allProjectViewAsyncFetch} from "./api/MainChartApi";


export const MainChart = () => {
    //pfProjectView图表的数据
    const [data, setData] = useState([]);

    useEffect(() => {
        allProjectViewAsyncFetch(setData);
    }, []);

    const config = {
        data: data.reverse(),
        isStack: true,
        xField: 'xField',
        yField: 'yField',
        seriesField: 'type',
        animation: true,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'left', 'middle', 'right'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };
    // @ts-ignore
    return (<Bar {...config} onReady={(bar) => {
        bar.on('interval:click', (...args: any) => {
            const data = args[0].data?.data;
            console.log(data, 'interval:click')

        });

        bar.on('axis-label:click', (e: Event) => {
            console.log('axis-label:click');
        });
    }}/>)
};

// ReactDOM.render(<MainChart/>, document.getElementById('container'));

