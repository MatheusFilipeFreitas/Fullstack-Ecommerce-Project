package com.mathffreitas.ecommerce;

import com.mathffreitas.ecommerce.entity.ProductCategoryEntity;
import com.mathffreitas.ecommerce.entity.ProductEntity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@SpringBootApplication
public class SpringBootEcommerceProjectApplication implements RepositoryRestConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootEcommerceProjectApplication.class, args);
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

		config.exposeIdsFor(ProductEntity.class);

		config.exposeIdsFor(ProductCategoryEntity.class);

	}
}
