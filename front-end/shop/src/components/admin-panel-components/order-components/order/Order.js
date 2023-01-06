import React from "react"
import DetailBody from "../../ui-components/detail-body-layout/Detail-body-layout"
import styles from "./order.module.css"

import { useSelector } from "react-redux"
import { resetOrder } from "../../../../store/admin/admin-reducers/order-reducer"
import { fetchOrder } from "../../../../store/admin/admin-actions/order-actions"
import { orderServices } from "../../../../services/admin-services/order-service"
import { validatorService } from "../../../../services/validator-services"

export default function Order () {

    const {order, error, isLoading} = useSelector(state=>state.adminOrder)

    return (
        <DetailBody error={error} 
                    loading={isLoading} 
                    fetch={fetchOrder} 
                    reset={resetOrder} 
                    deleteFunction={orderServices.deleteOrder}
                    editForm={'<ProductEdit product={product} categories={categories}/>'}>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>ID</div>
                <div className='admin__detail-value'>{order.id}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Ім'я</div>
                <div className='admin__detail-value'>{order.firstName}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Прізвище</div>
                <div className='admin__detail-value'>{order.lastName}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>По батькові</div>
                <div className='admin__detail-value'>{order.patronymic}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Номер замовлення</div>
                <div className='admin__detail-value'>{order.orderNumber}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Телефон</div>
                <div className='admin__detail-value'>{order.telephone}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Вулиця</div>
                <div className='admin__detail-value'>{order.street}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Будинок</div>
                <div className='admin__detail-value'>{order.building}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Під'їзд</div>
                <div className='admin__detail-value'>{order.sector}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Сплата</div>
                <div className='admin__detail-value'>{order.payment}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Ціна замовлення</div>
                <div className='admin__detail-value'>{order.totalPrice}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Коментар</div>
                <div className='admin__detail-value'>{order.comment ? order.comment : '----'}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Замовленно</div>
                <div className='admin__detail-value'>{validatorService.setLocaleTime(order.date)}</div>
            </div>

            {   order.orderedProducts &&
                    order.orderedProducts.map((item, index)=>{
                        return (
                            <div id={styles.orderedProduct} key={item.id} className='admin__detail-content'>
                                <div id={styles.orderedProductItem} className='admin__detail-name'>Замовленний товар № {index+1}</div>
                                <div className={styles.orderedProductValue}>
                                    <div className={styles.orderedProductTitle}>ID Товару</div>
                                    <p>{item.productId}</p>
                                </div>
                                <div className={styles.orderedProductValue}>
                                    <div className={styles.orderedProductTitle}>Назва</div>
                                    <p>{item.name}</p>
                                </div>
                                <div className={styles.orderedProductValue}>
                                    <div className={styles.orderedProductTitle}>Кількість</div>
                                    <p>{item.quantity}</p>
                                </div>
                            </div>
                        )
                    })
            }
            {
                order.choosedBox &&
                    order.choosedBox.map((item, index) => {
                        return (
                            <div id={styles.choosedBoxContent} key={item.id} className='admin__detail-content'>
                                <div id={styles.choosedBox} className='admin__detail-name'>Пакунок № {index+1}</div>
                                <div className={styles.orderedProductValue}>
                                    <div className={styles.orderedProductTitle}>ID коробки</div>
                                    <p>{item.boxId}</p>
                                </div>
                                <div className={styles.orderedProductValue}>
                                    <div className={styles.orderedProductTitle}>Назва коробки</div>
                                    <p>{item.boxName}</p>
                                </div>
                                <div className={styles.orderedProductValue}>
                                    <div className={styles.orderedProductTitle}>ID товару</div>
                                    <p>{item.productId}</p>
                                </div>
                                <div className={styles.orderedProductValue}>
                                    <div className={styles.orderedProductTitle}>Назва товару</div>
                                    <p>{item.productName}</p>
                                </div>
                            </div>
                        )
                    })
            }
        </DetailBody>
    )
}