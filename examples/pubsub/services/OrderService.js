class OrderService{
    static create(orderDetails) {
        return { status: true,orderDetails }
    }

    static rollback(orderDetails){
        return {status: true}
    }
}

module.exports = OrderService