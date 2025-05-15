package in.rupam.foodiesapi.config;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@ConfigurationProperties(prefix = "spring.aws")
@Getter
@Setter

public class EnvironmentDataConfig {

    @Value("${spring.aws.access.key}")
    private String accessKey;
    @Value("${spring.aws.secret.key}")
    private String secretKey;
    @Value("${spring.aws.region}")
    private String region;
    @Value("${spring.razorpay_key}")
    private String razorpayKey;
    @Value("${spring.razorpay_secret}")
    private String razorpaySecret;
    @Value("${spring.jwt.secret.key}")
    private String JWT_SECRET_KEY;
    @Value("${spring.data.mongodb.uri}")
    private String mongodbUri;
    @Value("${spring.aws.s3.bucketname}")
    private String bucketName;


    //By using this S3Client we can upload images to the bucket
    @Bean
    public S3Client s3Client(){
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey,secretKey)))
                .build();
    }


}
