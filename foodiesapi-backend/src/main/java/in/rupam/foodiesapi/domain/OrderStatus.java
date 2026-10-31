package in.rupam.foodiesapi.domain;

public enum OrderStatus {
    PLACED,
    CONFIRMED,
    REJECTED,
    PREPARING,
    READY_FOR_PICKUP,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED,
    FAILED;

    public boolean isTerminal() {
        return this == REJECTED || this == DELIVERED || this == CANCELLED || this == FAILED;
    }
}
