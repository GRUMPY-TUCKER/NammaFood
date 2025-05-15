package in.rupam.foodiesapi.controller;

import com.razorpay.RazorpayException;
import in.rupam.foodiesapi.io.OrderRequest;
import in.rupam.foodiesapi.io.OrderResponse;
import in.rupam.foodiesapi.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor

public class OrderController {

    private final OrderService orderService;

    @PostMapping(value = "/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request) throws RazorpayException {
        return orderService.createOrderWithPayment(request);
    }

    @PostMapping("/verify")
    public void verifyPayment(@RequestBody Map<String,String> paymentData){
        orderService.verifyPayment(paymentData, "Paid");
    }

    @GetMapping
    public List<OrderResponse> getOrders(){
        return orderService.getUserOrders();
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId){
        orderService.removeOrder(orderId);
    }


    //adminpanel
    @GetMapping("/all")
    public List<OrderResponse> getOrdersOfAllUsers(){
        return orderService.getOrdersOfAllUsers();
    }

    //adminpanel
    @PatchMapping("/status/{orderId}")
    public void updateOrderStatus(@PathVariable String orderId,@RequestParam String status){
        orderService.updateOrderStatus(orderId,status);
    }
}
