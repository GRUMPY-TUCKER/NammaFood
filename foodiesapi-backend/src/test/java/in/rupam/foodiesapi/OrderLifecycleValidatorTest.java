package in.rupam.foodiesapi;

import in.rupam.foodiesapi.domain.OrderStatus;
import in.rupam.foodiesapi.domain.OrderLifecycleValidator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class OrderLifecycleValidatorTest {

    @Test
    void shouldAllowValidOrderProgression() {
        assertTrue(OrderLifecycleValidator.canTransition(OrderStatus.PLACED, OrderStatus.CONFIRMED));
        assertTrue(OrderLifecycleValidator.canTransition(OrderStatus.CONFIRMED, OrderStatus.PREPARING));
        assertTrue(OrderLifecycleValidator.canTransition(OrderStatus.PREPARING, OrderStatus.READY_FOR_PICKUP));
        assertTrue(OrderLifecycleValidator.canTransition(OrderStatus.READY_FOR_PICKUP, OrderStatus.OUT_FOR_DELIVERY));
        assertTrue(OrderLifecycleValidator.canTransition(OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED));
    }

    @Test
    void shouldRejectInvalidOrderTransitions() {
        assertFalse(OrderLifecycleValidator.canTransition(OrderStatus.PLACED, OrderStatus.DELIVERED));
        assertFalse(OrderLifecycleValidator.canTransition(OrderStatus.READY_FOR_PICKUP, OrderStatus.PREPARING));
    }

    @Test
    void shouldAllowCancellationFromActiveState() {
        assertTrue(OrderLifecycleValidator.canTransition(OrderStatus.PLACED, OrderStatus.CANCELLED));
        assertTrue(OrderLifecycleValidator.canTransition(OrderStatus.PREPARING, OrderStatus.CANCELLED));
    }

    @Test
    void shouldRejectTransitionsFromTerminalState() {
        assertFalse(OrderLifecycleValidator.canTransition(OrderStatus.DELIVERED, OrderStatus.CANCELLED));
        assertFalse(OrderLifecycleValidator.canTransition(OrderStatus.REJECTED, OrderStatus.CONFIRMED));
    }
}
