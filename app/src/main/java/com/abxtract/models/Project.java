package com.abxtract.models;

import javax.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(referencedColumnName = "uuid2", name = "tenant")
    private String uuid;


}
