package doorgo.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	/**
	 *  Global CORS (Cross-origin resource sharing) configuration
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@NonNull CorsRegistry registry) {
				String[] allowedOrigins = {
						"https://localhost:3000",
						"https://192.168.0.101:3000",
						"https://doorgo.pages.dev",
						"https://*.doorgo.pages.dev",
				};
				registry.addMapping("/api/**")
						.allowedOrigins(allowedOrigins);
			}
		};
	}
}
