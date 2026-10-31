package in.rupam.foodiesapi.entity;

import in.rupam.foodiesapi.io.OrderItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, length = 500)
    private String userAddress;

    @Column(nullable = false, length = 20)
    private String phoneNumber;

    @Column(nullable = false, length = 160)
    private String email;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id"))
    private List<OrderItem> orderedItems = new ArrayList<>();

    @Column(nullable = false)
    private double amount;

    @Column(length = 32)
    private String paymentStatus;

    @Column(length = 120)
    private String razorpayOrderId;

    @Column(length = 250)
    private String razorpaySignature;

    @Column(length = 120)
    private String razorpayPaymentId;

    @Column(length = 32)
    private String orderStatus;
}
