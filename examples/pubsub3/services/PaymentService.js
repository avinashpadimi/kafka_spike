class PaymentService {
    static initiate() {
        //Payment process will be initiated
        return { status: true, oderDetails: {}}
    }

    static rollback() {
        // Amount refund will get initiated
    }

}

module.exports = PaymentService
