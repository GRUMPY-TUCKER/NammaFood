package in.rupam.foodiesapi.io;

import jdk.jshell.Snippet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodResponse {

    private String id;  //extra
    private String name;
    private String description;
    private String imageUrl;  //extra
    private double price;
    private String category;


}
