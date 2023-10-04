import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orders$, products$, viewedProducts$ } from '../../store';
import { fetchOrders, fetchProducts, fetchViewedProducts } from '../../services';
import { AnalysisComponent } from '../../components/Analysis';

export const AnalysisContainer = () => {
    const dispatch = useDispatch();
    const orders = useSelector(orders$);
    const products = useSelector(products$);
    const viewedProducts = useSelector(viewedProducts$);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchOrders());
        dispatch(fetchViewedProducts());
    }, [dispatch]);

    const getDataForPieChart = () => {
        const countObj = products.map((e) => e.name).reduce((a, v) => ({ ...a, [v]: 0}), {})

        const orderItemsIn2DFormat = orders.map(e => e.orderItems);
        const orderItemsIn1DFormat = [].concat.apply([], orderItemsIn2DFormat);

        orderItemsIn1DFormat.forEach(e => countObj[e.name]++)

        return Object.entries(countObj)
    }

    const getDataForBarChart = () => {
        const countObj = products.map((e) => e.name).reduce((a, v) => ({ ...a, [v]: 0}), {})

        viewedProducts.forEach(e => countObj[e.name]++)

        return Object.entries(countObj)
    }

    const dataForPieChart =[
        ['Products', 'Total Sale'],
        ...getDataForPieChart()
    ];

    const dataForBarChart = [
        ['Products', 'Views'],
        ...getDataForBarChart()
    ]

    return (
        <AnalysisComponent dataForPieChart={dataForPieChart} dataForBarChart={dataForBarChart} />
    )
}
