package in.rupam.foodiesapi.domain;

public enum PaymentStatus {
    PENDING,
    PROCESSING,
    SUCCESS,
    FAILED,
    CASH_PENDING,
    CASH_COLLECTED,
    SETTLED;

    public boolean isTerminal() {
        return this == SUCCESS || this == FAILED || this == SETTLED;
    }
}
