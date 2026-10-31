package in.rupam.foodiesapi.repository;

import in.rupam.foodiesapi.domain.Payment;
import in.rupam.foodiesapi.domain.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId(Long orderId);
    Optional<Payment> findByProviderReference(String providerReference);
    Optional<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
}
