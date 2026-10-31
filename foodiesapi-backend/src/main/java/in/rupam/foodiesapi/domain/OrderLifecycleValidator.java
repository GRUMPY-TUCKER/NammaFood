package in.rupam.foodiesapi.domain;

import java.util.EnumMap;
import java.util.Map;
import java.util.Set;

public final class OrderLifecycleValidator {

    private static final Map<OrderStatus, Set<OrderStatus>> ALLOWED_TRANSITIONS = createTransitionMap();

    private OrderLifecycleValidator() {
    }

    public static boolean canTransition(OrderStatus from, OrderStatus to) {
        if (from == null || to == null) {
            return false;
        }

        if (from.equals(to)) {
            return false;
        }

        if (from.isTerminal()) {
            return false;
        }

        return ALLOWED_TRANSITIONS.getOrDefault(from, Set.of()).contains(to);
    }

    private static Map<OrderStatus, Set<OrderStatus>> createTransitionMap() {
        EnumMap<OrderStatus, Set<OrderStatus>> transitions = new EnumMap<>(OrderStatus.class);
        transitions.put(OrderStatus.PLACED, Set.of(OrderStatus.CONFIRMED, OrderStatus.REJECTED, OrderStatus.CANCELLED));
        transitions.put(OrderStatus.CONFIRMED, Set.of(OrderStatus.PREPARING, OrderStatus.CANCELLED));
        transitions.put(OrderStatus.PREPARING, Set.of(OrderStatus.READY_FOR_PICKUP, OrderStatus.CANCELLED));
        transitions.put(OrderStatus.READY_FOR_PICKUP, Set.of(OrderStatus.OUT_FOR_DELIVERY, OrderStatus.CANCELLED));
        transitions.put(OrderStatus.OUT_FOR_DELIVERY, Set.of(OrderStatus.DELIVERED, OrderStatus.CANCELLED));
        return transitions;
    }
}
