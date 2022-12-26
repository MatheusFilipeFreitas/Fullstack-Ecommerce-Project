package com.mathffreitas.ecommerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<ProductEntity> products;
    // SET <<interface>>:
    //    Velocidade na pesquisa de dados, sendo mais rápida que um objeto do tipo List;
    //    A inserção de dados é mais lenta;
    //    Permite trabalhar com conjuntos e pode ser implementado como instâncias das classes HashSet ou TreeSet;
    //    Não precisa especificar a posição para adicionar um elemento;
    //    Não aceita valores duplicados. Se caso inserir um registro que já tenha no Set não será adicionado.
    //    Podem ser implementados como instâncias das classes HashSet ou TreeSet;


}
