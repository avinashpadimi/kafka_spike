class PaymentService {
    static initiate(payload) {
        //Payment process will be initiated
        console.log("---------Payment has been processed-----------")
        return { status: true, payload}
    }

    static rollback() {
        // Amount refund will get initiated
    }

}

module.exports = PaymentService
