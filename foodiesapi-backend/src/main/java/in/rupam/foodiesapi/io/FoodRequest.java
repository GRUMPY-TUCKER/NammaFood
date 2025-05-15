package in.rupam.foodiesapi.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FoodRequest {

    private String name;
    private String description;
    private double price;
    private String category;
}
