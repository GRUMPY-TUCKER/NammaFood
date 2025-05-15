package in.rupam.foodiesapi.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(collection = "foods")
@AllArgsConstructor
@NoArgsConstructor
public class FoodEntity {

    @Id
    private String id;  //extra
    private String name;
    private String description;
    private double price;
    private String category;
    @Setter
    private String imageUrl; //extra
}
